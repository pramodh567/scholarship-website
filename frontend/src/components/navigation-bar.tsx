import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import SearchBar from "./searchBar";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <div className="d-flex align-items-center">
            <i className="bi bi-mortarboard-fill fs-3 me-2"></i>
            <span className="fw-bold fs-3">Scholar</span>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link mt-1" to={"/create"}>
                <h4>Dev-suggestions</h4>
              </Link>
            </li>
          </ul>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
