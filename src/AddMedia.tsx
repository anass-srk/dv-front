import { Form, FormLabel } from "react-bootstrap";
import media_logo from "./assets/icon.png";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import Navbar from "./Navbar";
import { Cast, photo } from "./utils";
import xmark from "./assets/xmark.svg";
import Star from "./Star";

function AddMedia() {
  const [title, setTitle] = useState("");
  const [desc,setDesc] = useState("")
  const [mtype, setMtype] = useState(true);
  const [rdate, setRdate] = useState(new Date().getTime());
  const [file, setFile] = useState<File | null>(null);
  const [rating, setRating] = useState(1);
  const img = useRef<HTMLImageElement | null>(null);
  const [castList, setCastList] = useState<Cast[]>([]);
  const cast_list = useRef<Cast[]>([]);
  const producer = useRef(-1);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [scast,setScast] = useState<Cast | null>(null)
  const [scastList,setScastList] = useState<Cast[]>([])

  const showImage = useCallback(() => {
    const reader = new FileReader();

    reader.onload = () => {
      if (img.current) {
        const res = reader.result as string;
        img.current.src = res.trim() != "" ? res : media_logo;
      }
    };
    if (img.current) {
      img.current.src = media_logo;
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    showImage();
    cast_list.current = [
      {
        id: 0,
        name: "Adam Dumdum",
        gender: "male",
        birthday: new Date("09/09/1999").getTime(),
        photo: photo,
      },
      {
        id: 1,
        name: "Dam Dumdum",
        gender: "male",
        birthday: new Date("08/09/2000").getTime(),
        photo: photo,
      },
    ];
    setCastList(cast_list.current);
  }, [showImage]);

  return (
    <>
      <Navbar />
      <div className="container-parent">
        <div className="container-box">
          <div className="alert alert-secondary container-top">
            <h1 className="mb-3 text-center">Add Media</h1>
          </div>
          <Form style={{ padding: "8%" }} className="container">
            <div className="row justify-content-center">
              <img
                ref={img}
                style={{
                  maxWidth: "100%",
                  borderRadius: "0%",
                }}
                className="col-5"
              />
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>media image</Form.Label>
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>media file</Form.Label>
              <Form.Control
                type="file"
                accept={`${mtype ? "audio" : "video"}/*`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files != null && e.target.files.length == 1) {
                    setFile(e.target.files[0]);
                    showImage();
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)}/>
            </Form.Group>
            <div className="row align-items-center justify-content-around">
              <Form.Group controlId="formFile" className="mb-3 col-6">
                <FormLabel>Release date: </FormLabel>
                <Form.Control
                  type="date"
                  value={DateTime.fromMillis(rdate).toFormat("yyyy-MM-dd")}
                  onChange={(e) => setRdate(new Date(e.target.value).getTime())}
                />
              </Form.Group>
              <div className="mb-3 col-3 justify-content-center">
                <div
                  className="row justify-content-center"
                  style={{ padding: "2%", margin: "auto" }}
                >
                  <Form.Check
                    inline
                    label="audio"
                    name="group1"
                    type="checkbox"
                    checked={mtype}
                    onChange={() => setMtype(!mtype)}
                  />
                  <Form.Check
                    inline
                    label="video"
                    name="group1"
                    type="checkbox"
                    id="femaleCheck"
                    checked={!mtype}
                    onChange={() => setMtype(!mtype)}
                  />
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>{`rating: ${rating}`}</Form.Label>
                <div className="row">
                  {Array(10)
                    .fill(0, 0, 10)
                    .map((_, i) => (
                      <Star
                        className="col"
                        key={i}
                        color="#686D76"
                        bcolor={rating * 2 > i ? "#686D76" : "none"}
                        onClick={() => setRating((i + 1) / 2)}
                      />
                    ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Producer: </FormLabel>
                <Form.Select
                  onClick={(e) =>
                    (producer.current = Number(e.currentTarget.value))
                  }
                >
                  <option key={-1} value={-1}>
                    Select the producer
                  </option>
                  {castList.map((c, i) => (
                    <option key={i} value={i}>{`${c.id}:\t${c.name}`}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    const res = tag.trim();
                    if (res != "") {
                      if (!tags.includes(res)) {
                        setTags([...tags, res]);
                      }
                    }
                    setTag("");
                  }}
                >
                  Add tag
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "start",
                  maxWidth: "100%",
                }}
              >
                {tags.length == 0 && (
                  <div className="row" style={{ margin: "0px" }}>
                    <div className="col-auto mb-3">
                      <button
                        disabled
                        type="button"
                        className="btn"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          textWrap: "nowrap",
                          visibility: "hidden",
                        }}
                      >
                        <p style={{ margin: "auto" }}>asd</p>
                        <img
                          src={xmark}
                          alt="x"
                          width={16}
                          height={16}
                          className="white-svg"
                          style={{ marginLeft: "10px" }}
                        />
                      </button>
                    </div>
                  </div>
                )}
                {tags.map((t, i) => (
                  <div className="row" key={i} style={{ margin: "0px" }}>
                    <div className="col-auto mb-3">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          textWrap: "nowrap",
                        }}
                        onClick={() => setTags(tags.filter((_t) => t != _t))}
                      >
                        <p style={{ margin: "auto" }}>{t}</p>
                        <img
                          src={xmark}
                          alt="x"
                          width={16}
                          height={16}
                          className="white-svg"
                          style={{ marginLeft: "10px" }}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="input-group mb-3" style={{ width: "100%" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    if (scast != null && !scastList.includes(scast))
                      setScastList([...scastList, scast]);
                  }}
                >
                  Add cast
                </button>
                <Form.Select
                  onClick={(e) =>
                    setScast(castList[Number(e.currentTarget.value)])
                  }
                >
                  <option key={-1}>Select the cast</option>
                  {castList.map((c, i) => (
                    <option key={i} value={i}>{`${c.id}:\t${c.name}s`}</option>
                  ))}
                </Form.Select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "start",
                  maxWidth: "100%",
                }}
              >
                {scastList.length == 0 && (
                  <div className="row" style={{ margin: "0px" }}>
                    <div className="col-auto mb-3">
                      <button
                        disabled
                        type="button"
                        className="btn"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          textWrap: "nowrap",
                          visibility: "hidden",
                        }}
                      >
                        <p style={{ margin: "auto" }}>asd</p>
                        <img
                          src={xmark}
                          alt="x"
                          width={16}
                          height={16}
                          className="white-svg"
                          style={{ marginLeft: "10px" }}
                        />
                      </button>
                    </div>
                  </div>
                )}
                {scastList.map((c, i) => (
                  <div className="row" key={i} style={{ margin: "0px" }}>
                    <div className="col-auto mb-3">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          textWrap: "nowrap",
                        }}
                        onClick={() => {
                          setScastList(scastList.filter((_c) => c != _c));
                        }}
                      >
                        <p
                          style={{ margin: "auto" }}
                        >{`${c.id}:\t${c.name}`}</p>
                        <img
                          src={xmark}
                          alt="x"
                          width={16}
                          height={16}
                          className="white-svg"
                          style={{ marginLeft: "10px" }}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-success form-button">Add Media</button>
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

export default AddMedia;
