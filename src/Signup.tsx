import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Navbar";
import { host, Links, ServerLinks } from "./utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const nav = useNavigate()

  const [email,setEmail] = useState("")
  const [pwd,setPwd] = useState("")
  const [err,showErr] = useState("")

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(email.trim() == "" || pwd.trim() == ""){
      showErr("The email and password must not be empty !")
      return;
    }

    fetch(host + ServerLinks.auth.signup, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    }).then(async resp => {
      if(!resp.ok){
        showErr(await resp.text())
      }
      nav(Links.auth.login)
    })
  }


  return (
    <>
      <Navbar/>
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Sign-up</h1>
          </div>
          <form style={{ padding: "8%" }} method="post" onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="InputEmail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
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
                value={pwd}
                onChange={(e) => setPwd(e.currentTarget.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary form-button">
              Sign-up
            </button>
            <p>
              or{' '}
              <a className="link-opacity-100" href={Links.auth.login}>
                login
              </a>
            </p>
          </form>
{    err.trim() != ""  &&   <div
            className="alert alert-danger container-bottom"
            style={{ display: "block" }}
          >
            {err}
          </div>}
        </div>
      </div>
    </>
  );
}

export default Signup;
