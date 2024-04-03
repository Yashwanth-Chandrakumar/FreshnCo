import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Productview from "../user/Productview";
import Adminnav from "./Adminnav";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'e#4@X2!p9Zb$uYq6';

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const Admin: React.FC = () => {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get<User[]>(
        "https://freshnco.onrender.com/users"
      );
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`https://freshnco.onrender.com/user/${userId}`);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const togglePasswordVisibility = (userId: number) => {
    setVisiblePasswords((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };
  const encryptedName = localStorage.getItem('name');
const name = encryptedName ? decryptData(encryptedName) : '';

  return (
    <>
      <Adminnav />
      <div className="admin-content">
        <div className="admin-sidebar">
          <Link
            className="btn adduser btn-outline-primary mx-2"
            to={`/adduser`}
          >
            Add user
          </Link>
        </div>
        <div className="container" id="admin-space">
          <h1>
            Welcome{" "}
            <span style={{ color: "var(--btncolor)" }}>
              {name}
            </span>
          </h1>
          <h2>You are one of our esteemed admin.</h2>
          <br />
          <h1>Edit user profiles</h1>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">FName</th>
                  <th scope="col">LName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{user.id}</th>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.email}</td>
                    <td>
                      {visiblePasswords.includes(user.id) ? (
                        user.password
                      ) : (
                        <span className="password-placeholder">••••••••</span>
                      )}
                      <button
                        type="button"
                        className="btn btn-link password-toggle"
                        onClick={() => togglePasswordVisibility(user.id)}
                      >
                        {visiblePasswords.includes(user.id) ? (
                          <VisibilityIcon className="eye" fontSize="small" />
                        ) : (
                          <VisibilityOffIcon className="eye" fontSize="small" />
                        )}
                      </button>
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewuser/${user.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edituser/${user.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Productview />
        </div>
      </div>
    </>
  );
};

export default Admin;
