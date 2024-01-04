import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const Edituser: React.FC = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState<User>({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const { fname, lname, email, password } = user;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.put(`https://freshnco.onrender.com/user/${id}`, user);
    navigate("/admin");
  };

  const loadUser = async () => {
    try {
      const result = await axios.get<User>(
        `https://freshnco.onrender.com/user/${id}`
      );
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                FName
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="fname"
                value={fname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Lname
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="lname"
                value={lname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edituser;
