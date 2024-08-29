import { FloatingLabel, Form } from "react-bootstrap";
import cast_logo from "./assets/cast.svg"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import Navbar from "./Navbar";


function AddCast(){

  const [name,setName] = useState('')
  const [gender,setGender] = useState(true)
  const [dob,setDob] = useState(new Date().getTime())
  const [file,setFile] = useState<File | null>(null) 
  const img = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    showImage()
  })

  function showImage() {
    const reader = new FileReader();

    reader.onload = (_ev) => {
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

  return (
    <>
      <Navbar/>
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Add Cast Member</h1>
          </div>
          <Form style={{ padding: "8%" }} className="container">
            <div className="row justify-content-center">
              <img
                ref={img}
                style={{
                  maxWidth: "100%",
                  borderRadius: "0%",
                  border: "2px solid black",
                }}
                className="col-6"
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
            <div className="mb-3 row justify-content-center">
              <div className="col" style={{ padding: "2%" }}>
                <Form.Check
                  inline
                  label="male"
                  name="group1"
                  type="checkbox"
                  id="maleCheck"
                  checked={gender}
                  onChange={() => setGender(!gender)}
                />
                <Form.Check
                  inline
                  label="female"
                  name="group1"
                  type="checkbox"
                  id="femaleCheck"
                  checked={!gender}
                  onChange={() => setGender(!gender)}
                />
              </div>
              <Form.Control
                type="date"
                className="col"
                style={{ maxWidth: "50%" }}
                value={DateTime.fromMillis(dob).toFormat("yyyy-MM-dd")}
                onChange={(e) => setDob(new Date(e.target.value).getTime())}
              />
            </div>
            <button className="btn btn-success form-button">
              Add Cast Member
            </button>
          </Form>
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

export default AddCast;