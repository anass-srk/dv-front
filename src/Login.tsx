import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Navbar";
import { Links, LoginResp, noauthReq, ServerLinks } from "./utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState('')
  const [pwd,setPwd] = useState('')
  const [err,setErr] = useState('')

  const nav = useNavigate()

  function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(email.trim() == '' || pwd.trim() == ''){
      setErr('The email and password must not be empty !')
      return
    }
    noauthReq(ServerLinks.auth.login,'post',{email: email,password: pwd})
    .then(async resp => {
      if(!resp.ok){
        setErr(await resp.text())
      }else{
        const auth: LoginResp = await resp.json()
        localStorage.setItem('auth',JSON.stringify(auth))
        nav(Links.media.search)
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Login</h1>
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
              Login
            </button>
            <div style={{float: "right"}}>
              <p>
                or{" "}
                <a className="link-opacity-100" href={Links.auth.signup}>
                  sign-up
                </a>
              </p>
              <p>
                or{" "}
                <a className="link-opacity-100" href={Links.auth.forgot}>
                  forgot password
                </a>
              </p>
            </div>
          </form>
          {err.trim() != "" && (
            <div
              className="alert alert-danger container-bottom"
              style={{ display: "block" }}
            >
              {err}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
