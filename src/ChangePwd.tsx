import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Navbar";
import { Links, noauthReq, ServerLinks } from "./utils";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ChangePwd() {

  const nav = useNavigate()
  const paras = useSearchParams()
  const id = paras[0].get('id')

  const [pwd,setPwd] = useState("")
  const [err,showErr] = useState("")

  if(id == null) showErr("Invalid id ! Must use email link !")

  function submit(e: React.FormEvent<HTMLFormElement>) {
    if(id == null) return
    e.preventDefault()
    if(pwd.trim() == ""){
      showErr("The password must not be empty !")
      return;
    }
    noauthReq(ServerLinks.auth.change + '/' + id,'post',{password: pwd}).then(async resp => {
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
            <h1 className="mb-3 text-center">Change Password</h1>
          </div>
          <form style={{ padding: "8%" }} method="post" onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputEmail"
                name="email"
                value={pwd}
                onChange={(e) => setPwd(e.currentTarget.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary form-button">
              confirm
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

export default ChangePwd;
