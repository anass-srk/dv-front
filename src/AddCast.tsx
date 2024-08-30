import { FloatingLabel, Form, FormLabel } from "react-bootstrap";
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
      <Navbar />
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
              </div>
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