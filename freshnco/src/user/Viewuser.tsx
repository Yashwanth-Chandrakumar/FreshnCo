import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const Viewuser: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

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
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>FName:</b> {user.fname}
                </li>
                <li className="list-group-item">
                  <b>LName:</b> {user.lname}
                </li>
                <li className="list-group-item">
                  <b>Email:</b> {user.email}
                </li>
                <li className="list-group-item">
                  <b>Password:</b> {user.password}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/admin"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Viewuser;
