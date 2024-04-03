import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import axios from "axios";
import regimg from "../assets/images/3945191.jpg";
import * as CryptoJS from 'crypto-js';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SECRET_KEY = 'e#4@X2!p9Zb$uYq6';

const decryptData = (ciphertext:string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

function Register() {
  let navigate = useNavigate();
  useEffect(() => {
    const encryptedAuth = localStorage.getItem("auth");
    const auth = encryptedAuth ? decryptData(encryptedAuth) : "";
    if (auth === "true") {
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
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fname: "", lname: "", email: "", password: "" };

    // Validate First Name
    if (user.fname.trim() === "") {
      isValid = false;
      newErrors.fname = "First Name is required";
    }

    // Validate Last Name
    if (user.lname.trim() === "") {
      isValid = false;
      newErrors.lname = "Last Name is required";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      isValid = false;
      newErrors.email = "Invalid email address";
    }

    // Validate Password
    const passregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passregex.test(user.password)) {
      isValid = false;
      newErrors.password =
        "Password must be a combination of capital and small letters along with symbols and numbers of length 8";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const pendingToastId = toast.info(
        "😀 Signing up... (Sorry for the cold boot)",
        { autoClose: false }
      );
      try {
        await axios.post("https://freshnco.onrender.com/user", user);
        console.log("Data successfully sent to the server!");
        toast.update(pendingToastId, {
          render: "🌞 Login to continue",
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
          onClose: () => navigate("/login"),
        });
      } catch (error) {
        console.error("Error sending data to the server:", error);
        toast.update(pendingToastId, {
          render: "😔 Error during login.",
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
    }
  };


  return (
    <div className="container py-4">
      <ToastContainer />
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
                        value={user.fname}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label className="form-label">First Name</label>
                      <div className="text-danger">{errors.fname}</div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="lname"
                        value={user.lname}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label className="form-label">Last Name</label>
                      <div className="text-danger">{errors.lname}</div>
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <label className="form-label">Email address</label>
                  <div className="text-danger">{errors.email}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={user.password}
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
                  <div className="text-danger">{errors.password}</div>
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
                  <button
                    onClick={()=>{navigate("/login")}}
                    className="btn btn-primary btn-block mb-4"
                    id="button1"
                  >
                    Sign in
                  </button>
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
