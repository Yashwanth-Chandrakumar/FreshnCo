import DarkModeToggle from "./DarkModeToggle";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useSelector } from 'react-redux'
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'e#4@X2!p9Zb$uYq6';

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
function NavBar() {
  let navigate = useNavigate();
  let tab = localStorage.getItem("livetab");
  const encryptedName = localStorage.getItem('name');
const name = encryptedName ? decryptData(encryptedName) : '';

// Decrypt admin
const encryptedAdmin = localStorage.getItem('admin');
const admin = encryptedAdmin ? decryptData(encryptedAdmin) : '';


// Decrypt auth
const encryptedAuth = localStorage.getItem('auth');
const auth = encryptedAuth ? decryptData(encryptedAuth) : '';

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    let txt = e.currentTarget.textContent;
    if (txt === "Login") {
      navigate("/login");
    }
  };
  const cart = useSelector((state: any) => state.cartReducer.cart);

  const cartSize = cart.length;
  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
      right: -3,
      fontWeight: "600",
      top: 14,
      border: `2px solid var(--bgcolor)`,
      padding: "1.5px 2px 1.5px 1.5px",
      color: "var(--textcolor)",
      backgroundColor: "var(--btncolor)",
    },
  }));
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand">Fresh & Co.</span>
          <Link to="/admin">
            <span style={{ display: admin === "true" ? "block" : "none", color:"var(--textcolor)" }}>View as admin</span>
            </Link>
          <span className="dm">
            <DarkModeToggle />
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav" id="navlinks">
              <Link to="/">
                <li className="nav-item">
                  <span
                    className={`nav-link ${tab === "home" ? "live" : ""}`}
                    aria-current="page"
                  >
                    Home
                  </span>
                </li>
              </Link>
              <Link to={auth === "true" ? "/products" : "/login"}>
                <li className="nav-item">
                  <span
                    className={`nav-link align-text-bottom ${
                      tab === "products" ? "live" : ""
                    }`}
                  >
                    Products
                  </span>
                </li>
              </Link>
              <Link to="/cart">
              <li className="nav-item">
                <span
                  style={{ paddingTop: "0" }}
                  className={`nav-link bag align-text-bottom ${
                    tab == "cart" ? "live" : ""
                  }`}
                >
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cartSize}>
                      <LocalMallIcon
                        style={{
                          color: `${
                            tab === "cart"
                              ? "var(--btncolor)"
                              : "var(--iconcolor)"
                          }`,
                        }}
                      />
                    </StyledBadge>
                  </IconButton>
                </span>
              </li>
              </Link>
              <Link to={auth==="true"?"/dash":"/login"}>
              <li className="nav-item dropdown">
                <span
                  className={`nav-link ${
                    tab == "dash" ? "live" : ""
                  }`}
                  id={auth === "true" ? "nav-account" : "nav-login"}
                  onClick={handleClick}
                >
                  {auth === "true" ? (
                    <Avatar
                      sx={{
                        bgcolor: "var(--btncolor)",
                        fontFamily: "var(--body-font)",
                        fontWeight: "600",
                        height: 30,
                        width: 30,
                        fontSize: "0.9rem",
                      }}
                    >
                      {name.charAt(0)}
                    </Avatar>
                  ) : (
                    "Login"
                  )}
                </span>
                </li>
                </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
