import DarkModeToggle from "./DarkModeToggle";
import { Link} from "react-router-dom";
function Adminnav() {
  let tab = localStorage.getItem("livetab");

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
              <Link to={`/${tab==="home"?"":tab}`}>
                <li className="nav-item">
                  <span
                    className={`nav-link`}
                    aria-current="page"
                  >
                    View as a user
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
export default Adminnav;
