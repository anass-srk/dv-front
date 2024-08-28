import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from "./assets/icon.png";
import cast_plus_logo from "./assets/cast-plus.svg";
import filter_logo from "./assets/filter.svg";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid" style={{ flexWrap: "nowrap" }}>
          <a className="navbar-brand" href="#" style={{ margin: "0" }}>
            <img src={logo} alt="logo" width={48} height={48} />
          </a>
          <p style={{ margin: "auto" }}>Discover Darija !</p>
          <button
            className="btn btn-success"
            type="button"
            aria-expanded="false"
          >
            <img
              src={cast_plus_logo}
              alt="add_cast_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </button>
          <div className="dropdown">
            <button
              style={{ flexBasis: "50px" }}
              type="button"
              className="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <img src={filter_logo} alt="filter_logo" width={24} height={24} />
            </button>
            <div
              className="dropdown-menu p-1"
              id="filters-dropdown"
              style={{ minWidth: "300px" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col mt-2">Add filters</div>
                  <div className="col">
                    <button
                      id="clear-all"
                      className="btn"
                      style={{ color: "blue", float: "inline-end" }}
                    >
                      clear all
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      id="filter-btn"
                    >
                      Add filter
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul
                      className="dropdown-menu text-center"
                      id="selected-filter"
                    >
                      <li data-type="number">
                        <a className="dropdown-item">id</a>
                      </li>
                      <li data-type="text">
                        <a className="dropdown-item">name</a>
                      </li>
                      <li data-type="text">
                        <a className="dropdown-item">gender</a>
                      </li>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="0"
                          id="rangeSwitch"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rangeSwitch"
                        >
                          Range ?
                        </label>
                      </div>
                    </ul>
                    <input
                      type="text"
                      className="form-control"
                      id="filter-value"
                    />
                    <input
                      type="hidden"
                      className="form-control"
                      id="filter-value2"
                    />
                  </div>
                </div>
                <div id="row" className="row"></div>
              </div>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Darija Vault
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    media management
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cast">
                    cast management
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    trending
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    recommendations
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    watch
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
