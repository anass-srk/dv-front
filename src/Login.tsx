import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Navbar";
import { Links } from "./utils";

function Login() {
  return (
    <>
      <Navbar />
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Login</h1>
          </div>
          <form style={{padding: "8%"}} method="post">
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="InputEmail"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-primary form-button">
              Login
            </button>
            <a>
              or{" "}
              <a className="link-opacity-100" href={Links.auth.signup}>
                sign-up
              </a>
            </a>
          </form>
          {/* <div
            className="alert alert-danger container-bottom"
            style={{ display: "block" }}
          >
            Unsuccessful login Attempt !
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Login;
