import DarkModeToggle from "./DarkModeToggle";
import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
function NavBar() {
  let navigate = useNavigate();
  let tab = localStorage.getItem("livetab");
  let auth = localStorage.getItem("auth");
  
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (e.currentTarget.innerText === "Logout") {
      localStorage.setItem("auth", "false");
      console.log("auth removed");
      navigate("/login");
      e.preventDefault();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand">Fresh & Co.</span>
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
              <Link to={auth==="true"?"/products":"/login"}>
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
              <li className="nav-item ">
                <span
                  className={`nav-link bag align-text-bottom ${
                    tab == "cart" ? "live" : ""
                  }`}
                >
                  <LocalMallIcon
                    style={{
                      color: `${tab === "cart" ? "var(--btncolor)" : ""}`,
                    }}
                  />
                </span>
              </li>
              <Link to="/login">
                <li className="nav-item dropdown" id="nav-login">
                  <span
                    className={`nav-link`}
                    id="nav-login"
                    onClick={handleClick}
                  >
                    {auth==="true"?"Logout":"Login" }
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
