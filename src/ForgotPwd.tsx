import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Navbar";
import { Links, noauthReq, ServerLinks } from "./utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPwd() {

  const nav = useNavigate()

  const [email,setEmail] = useState("")
  const [err,showErr] = useState("")

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(email.trim() == ""){
      showErr("The email must not be empty !")
      return;
    }
    noauthReq(ServerLinks.auth.forgot,'post',{email: email}).then(async resp => {
      if(!resp.ok){
        showErr(await resp.text())
      }else{
        nav(Links.auth.login)
      }
    })
  }


  return (
    <>
      <Navbar/>
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Forgot password</h1>
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
            <button type="submit" className="btn btn-primary form-button">
              send link
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

export default ForgotPwd;
