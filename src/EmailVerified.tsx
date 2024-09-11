import { Alert } from "react-bootstrap";
import Navbar from "./Navbar";
import { Links, noauthReq, ServerLinks } from "./utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EmailVerified(){
  
  const nav = useNavigate()
  const pars = useSearchParams()
  const id = pars[0].get('id')
  if(id == null) nav(Links.auth.login)
  const [err,setErr] = useState(false)
  
  useEffect(() => {
    noauthReq(ServerLinks.auth.verify + '/' + id,'get')
    .then(async resp => {
      if(!resp.ok){
        setErr(true)
      }
    })
  })

  return (
    <>
      <Navbar />
      { err ?
      <Alert
        variant="danger"
        style={{
          minWidth: "max(50vw, 40vh)",
          maxWidth: "min(50vh, 40vw)",
          marginInline: "auto",
          marginTop: "10%",
          textAlign: "center",
        }}
      >
        Invalid verification link ! Go back to the  
        <a className="link-opacity-100" href={Links.auth.login}>
          {' login '}
        </a>
        page
      </Alert>
      :
      <Alert
        variant="success"
        style={{
          minWidth: "max(50vw, 40vh)",
          maxWidth: "min(50vh, 40vw)",
          marginInline: "auto",
          marginTop: "10%",
          textAlign: "center",
        }}
      >
        Your email has been verified ! Go back to the  
        <a className="link-opacity-100" href={Links.auth.login}>
          {' login '}
        </a>
        page
      </Alert> }
    </>
  );

}

export default EmailVerified;