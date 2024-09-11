import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from "./assets/icon.png";
import plus_logo from "./assets/plus.svg";
import FilterElem from "./Filter";
import { authReq, Filter, Links, LoginResp, ServerLinks, SFilter } from "./utils";
import { useNavigate } from "react-router-dom";

function Navbar({onChange,filters,subject}: {onChange: (sfs: SFilter[]) => void, filters: Filter[], subject: "cast" | "media"}) {

  const authStr = localStorage.getItem("auth");
  const auth: LoginResp | null = authStr == null ? null : JSON.parse(authStr);

  const nav = useNavigate();

  function logout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    authReq(ServerLinks.auth.logout, "get", {}).then(async (resp) => {
      if (resp.ok) {
        nav(Links.auth.login);
      }
    });
  }

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
            href={subject == "cast" ? Links.cast.add : Links.media.add}
          >
            <img
              src={plus_logo}
              alt="plus_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </a>
          <FilterElem onChange={onChange} filters={filters} />
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
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href={Links.auth.login}
                  >
                    Login
                  </a>
                </li>
                {(auth?.role ?? "") == "ADMIN" && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href={Links.media.list}>
                        media management
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={Links.cast.list}>
                        cast management
                      </a>
                    </li>
                  </>
                )}
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
                  <a className="nav-link" href={Links.media.search}>
                    search
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    profile
                  </a>
                </li>
                {auth != null && (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
