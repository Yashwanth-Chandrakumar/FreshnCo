import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import axios from "axios";
import regimg from "../assets/images/3945191.jpg"
function Register() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/");
    }
  }, []);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { fname, lname, email, password } = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", user);
      console.log("Data successfully sent to the server!");
      navigate("/login");
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-0 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card cascading-right">
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5" id="welcome">
                Welcome :)
              </h2>
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="fname"
                        value={fname}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label className="form-label">First Name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="lname" 
                        value={lname}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label className="form-label">Last Name</label>
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email" 
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <label className="form-label">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <label className="form-label">Password</label>
                  <button
                    type="button"
                    className="btn btn-link password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <VisibilityIcon className="eye" fontSize="small" />
                    ) : (
                      <VisibilityOffIcon className="eye" fontSize="small" />
                    )}
                  </button>
                </div>
                <div className="form-check d-flex justify-content-center mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example33"
                    defaultChecked
                  />
                  <label className="form-check-label">
                    Subscribe to our newsletter
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign up
                </button>

                <div className="text-center">
                  <p>or sign up with:</p>
                  <button type="button" className="btn btn-link" id="gicon">
                    <FontAwesomeIcon icon={faGoogle} size="2x" />
                  </button>
                </div>
                <div className="text_center">
                  <p>Existing user</p>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-block mb-4"
                    id="button1"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-5 mb-lg-0" id="limg">
          <img
            src={regimg}
            height="100%"
            width="100%"
            className="rounded-100 shadow-100"
            alt="register"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
