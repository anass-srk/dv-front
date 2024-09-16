import { FloatingLabel, Form, FormLabel } from "react-bootstrap";
import cast_logo from "./assets/cast.svg"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import Navbar from "./Navbar";
import {authReq, Cast, Gender, Links, server, ServerLinks } from "./utils";
import { useNavigate, useSearchParams } from "react-router-dom";


function ModCast(){

  const params = useSearchParams()
  const _id = params[0].get('id')
  const nav = useNavigate()

  if(_id == null) nav(Links.cast.list)
  const id = Number(_id)

  const [name,setName] = useState('')
  const [gender,setGender] = useState<Gender>("MALE")
  const [dob,setDob] = useState(new Date().getTime())
  const [file,setFile] = useState<File | null>(null) 
  const [err,setErr] = useState("")
  const img = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    showImage()
  },[file])

  useEffect(() => {
    authReq(ServerLinks.cast.get + "/" + id, "get", {}).then(
      async (resp) => {
        if (resp.ok) {
          const c = (await resp.json()) as Cast;
          setName(c.name);
          setGender(c.gender);
          setDob(c.birthday);
          authReq(ServerLinks.cast.get_photo + "/" + c.photo, "get", {}).then(
            async (resp) => {
              if (resp.ok) {
                setFile((await resp.blob()) as File);
              }
            }
          );
        }else{
          setErr("Unable to load cast member !");
        }
      }
    );
  },[id])

  function showImage() {
    const reader = new FileReader();

    reader.onload = () => {
      if (img.current) {
        const res = reader.result as string;
        img.current.src = res.trim() != "" ? res : cast_logo;
      }
    };
    if (img.current) {
      img.current.src = cast_logo;
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    
    if(name.trim() == '' && file != null){
      setErr("The name and the photo must not be null !")
      return
    }
    
    setErr('')
    const formData = new FormData()
    formData.set("id",id.toString())
    formData.set("name",name)
    formData.set("gender",gender)
    formData.set("birthday",dob.toString())
    formData.set('photo',file!)
    
    authReq(ServerLinks.cast.mod,'post',formData)
    .then(async resp => {
      if(resp.ok){
        console.log(await resp.json())
        window.location.replace(server + Links.cast.list)
      }else{
        setErr((await resp.text()))
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Modify Cast Member</h1>
          </div>
          <Form style={{ padding: "8%" }} className="container" onSubmit={submit}>
            <div className="row justify-content-center">
              <img
                ref={img}
                style={{
                  maxWidth: "100%",
                  borderRadius: "0%",
                  border: "2px solid black",
                }}
                className="col-5"
              />
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>cast photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files != null && e.target.files.length == 1) {
                    setFile(e.target.files[0]);
                    showImage();
                  }
                }}
              />
            </Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Full name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <div className="row align-items-center justify-content-around">
              <Form.Group controlId="formFile" className="mb-3 col-6">
                <FormLabel>Birthday: </FormLabel>
                <Form.Control
                  type="date"
                  value={DateTime.fromMillis(dob).toFormat("yyyy-MM-dd")}
                  onChange={(e) => setDob(new Date(e.target.value).getTime())}
                />
              </Form.Group>
              <div className="mb-3 col-3 justify-content-center">
                <div className="row justify-content-center" style={{ padding: "2%", margin: "auto" }}>
                  <Form.Check
                    inline
                    label="male"
                    name="group1"
                    type="checkbox"
                    checked={gender == "MALE"}
                    onChange={() => setGender("MALE")}
                  />
                  <Form.Check
                    inline
                    label="female"
                    name="group1"
                    type="checkbox"
                    id="femaleCheck"
                    checked={gender == "FEMALE"}
                    onChange={() => setGender("FEMALE")}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-success form-button" type="submit">
              Modify Cast Member
            </button>
          </Form>
{ err.trim() != '' && 
          <div
            className="alert alert-danger container-bottom"
            style={{ display: "block" }}
          >
            {err}
          </div>
}
        </div>
      </div>
    </>
  );
}

export default ModCast;