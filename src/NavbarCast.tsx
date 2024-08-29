import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from "./assets/icon.png";
import cast_plus_logo from "./assets/cast-plus.svg";
import Filter from "./Filter";
import { Links, SFilter } from "./utils";

function Navbar({onChange}: {onChange: (sfs: SFilter[]) => void}) {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid" style={{ flexWrap: "nowrap" }}>
          <a className="navbar-brand" href="#" style={{ margin: "0" }}>
            <img src={logo} alt="logo" width={48} height={48} />
          </a>
          <p style={{ margin: "auto" }}>Discover Darija !</p>
          <a
            className="btn btn-success"
            type="button"
            aria-expanded="false"
            href={Links.cast.add}
          >
            <img
              src={cast_plus_logo}
              alt="add_cast_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </a>
          <Filter
            onChange={onChange}
            filters={[
              {
                field: "id",
                type: "number",
              },
              {
                field: "name",
                type: "string",
              },
              {
                field: "gender",
                type: "string",
              },
              {
                field: "birthday",
                type: "datetime",
              },
            ]}
          />
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
                  <a className="nav-link active" aria-current="page" href={Links.auth.login}>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    media management
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={Links.cast.list}>
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
                  <a className="nav-link" aria-current="page" href={Links.auth.logout}>
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
