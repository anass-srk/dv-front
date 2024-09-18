import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Alert, Badge } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { authReq, MediaElem, ServerLinks } from "./utils";
import { DateTime } from "luxon";
import Star from "./Star";

function MediaPage() {
  const _id = useParams().id;
  const id = _id == null ? NaN : Number(_id);
  const pcue = useRef<VTTCue | null>(null);
  const [sub,setSub] = useState<HTMLVideoElement | null>(null);
  const subs = useRef<HTMLDivElement | null>(null);
  const text = useRef<VTTCue[]>([])

  // function display() {
  //   if (subs.current == null || sub.current == null) return;
  //   const track = sub.current.textTracks[0];
  //   if (track.activeCues == null || track.activeCues.length == 0) return;
  //   const cue = track.activeCues[0] as VTTCue;
  //   if(subs.current.childElementCount >= 30){
  //     for(let i = 0;i < 20;++i){
  //       document.getElementById(`sub${i}`)?.remove();
  //     }
  //   }
  //   if(cue != pcue.current){
  //     pcue.current = cue;
  //     const h4 = document.createElement("h4");
  //     h4.id = `sub${sub.current.children.length}`;
  //     h4.style.width = "100%";
  //     h4.innerHTML = `<span style='margin-top: 10px' class="badge text-bg-primary">${Math.floor(cue.startTime/60).toLocaleString('en-US',{minimumIntegerDigits: 2})}:${Math.floor(cue.startTime%60).toLocaleString('en-US',{minimumIntegerDigits: 2})}</span> ${cue.text}`;
  //     subs.current.appendChild(h4);
  //     subs.current.scrollTo(0,subs.current.scrollHeight)
  //   }
  // }

  function getIndex<T>(l: T[],x: T): number{
    for(let i = 0;i < l.length;++i){
      if(x == l[i]){
        return i;
      }
    }
    return -1;
  }

  function toList<T>(l: {length: number,[j: number]: T} | null){
    const res: T[] = []
    if(l == null) return res
    for(let i = 0;i < l.length;++i){
      res.push(l[i])
    }
    return res
  }

  function showSubs(){
    if(subs.current == null || sub == null || text.current.length == 0) return
    const track = sub.textTracks[0]
    if (track.activeCues == null || track.activeCues.length == 0) return
    const cue = track.activeCues[0] as VTTCue
    if(cue != pcue.current){
      const i = getIndex(text.current,cue)
      const j = getIndex(text.current,pcue.current)
      for(let k = i+1;k <= j;++k){
        document.getElementById(`sub${k}`)?.remove()
      }
      for(let k = j+1;k <= i;++k){
        const h4 = document.createElement('h4')
        h4.id = `sub${k}`
        h4.style.width = "100%"
        const c = text.current[k]
        h4.innerHTML = `<span style='margin-top: 10px' class="badge text-bg-primary">${Math.floor(c.startTime/60).toLocaleString('en-US',{minimumIntegerDigits: 2})}:${Math.floor(c.startTime%60).toLocaleString('en-US',{minimumIntegerDigits: 2})}</span> ${c.text}`
        subs.current.appendChild(h4)
      }
      pcue.current = cue
      subs.current.scrollTo(0,subs.current.scrollHeight)
      if (subs.current.childElementCount >= 30) {
        let k = 0,m = 0
        while(k <= 20){
          const e = document.getElementById(`sub${k+m}`)
          if(e != null){
            k += 1
            e.remove()
          }else{
            m += 1
          }
        }
      }
    }
  }

  const [media, setMedia] = useState<MediaElem | null>(null);
  const [file,setFile] = useState<File | null>(null)
  const [data,setData] = useState<File | null>(null)

  useEffect(() => {
    text.current = []
    setInterval(() => {
    if (sub != null && text.current.length == 0) {
      text.current = toList(sub.textTracks[0].cues) as VTTCue[];
    }
    },1000)
  });



  useEffect(() => {
    authReq(ServerLinks.media.get + "/" + id, "get", {}).then(async (resp) => {
      if (resp.ok) {
        const m = (await resp.json()) as MediaElem
        setMedia(m)
        authReq(ServerLinks.media.get_files + "/" + m.img, "get", {}).then(
          async (r) => {
            if (r.ok) {
              setFile((await r.blob()) as File);
            }
          }
        );
        authReq(ServerLinks.media.get_files + "/" + m.data, "get", {}).then(
          async (r) => {
            if (r.ok) {
              const d = (await r.blob()) as File
              setData(d)
            }
          }
        );
      } else {
        setMedia(null)
      }
    });
  },[])

  useEffect(() => {
    media?.cast.forEach(c => {
      authReq(ServerLinks.cast.get_photo + "/" + c.photo, "get", {}).then(
        async (resp) => {
          if (resp.ok) {
            c.photo = URL.createObjectURL((await resp.blob()) as File);
          } else {
            console.log("ERR : ", c.photo);
          }
        }
      );
    })
  },[media])

  return (
    <>
      <Navbar />
      {isNaN(id) || media == null || file == null || data == null ? (
        <Alert
          variant="light"
          style={{
            minWidth: "max(50vw, 40vh)",
            maxWidth: "min(50vh, 40vw)",
            marginInline: "auto",
            marginTop: "10%",
            textAlign: "center",
          }}
        >
          no content with id {_id} is found
        </Alert>
      ) : (
        <div className="scroll" style={{ color: "black" }}>
          <div className="media-header">
            <div
              ref={(e) => {
                if (e != null) e.style.backgroundImage = `url(${URL.createObjectURL(file!)})`;
              }}
              style={{
                width: "100%",
                height: "200%",
                zIndex: "-1",
                position: "absolute",
                filter: "blur(50px) contrast(50%)",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <img src={URL.createObjectURL(file!)} width={320} height={475} />
            <div
              style={{
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "space-evenly",
              }}
            >
              <h1>
                <Badge>{media.title}</Badge>
              </h1>
              <h4>
                <Badge bg="secondary">
                  {DateTime.fromMillis(media.release_date).toFormat(
                    "dd LLL yyyy"
                  )}
                </Badge>
              </h4>
              <div className="row">
                {Array(10)
                  .fill(0, 0, 10)
                  .map((_, i) => (
                    <Star
                      key={i}
                      color="white"
                      bcolor={i + 1 <= media.rating * 2 ? "white" : "none"}
                      className="media-header-star"
                    />
                  ))}
              </div>
              <div className="tags">
                {media.tags.map((t, i) => (
                  <p key={i} style={{ border: "1px solid gray" }}>
                    {t}
                  </p>
                ))}
              </div>
              <h5 style={{ maxWidth: "max(50vw,300px)" }}>{media.desc}</h5>
            </div>
          </div>
          <div className="media-cast">
            {/* {Array(120)
              .fill(0, 0, 20)
              .map((_, i) =>
                media.cast
                  .filter((c) => c != media.producer)
                  .map((c, j) => (
                    <div className="cast" key={i}>
                      <img src={c.photo} width={183} height={275} />
                      <h5>
                        {c.name}
                        {i}
                      </h5>
                    </div>
                  ))
              )} */}
            {media.cast.map((c, i) => (
              <div className="cast" key={i}>
                <img src={c.photo} width={183} height={275} />
                <h5>
                  {c.name}
                </h5>
              </div>
            ))}
          </div>
          <video
            ref={(r) => setSub(r)}
            onTimeUpdate={() => showSubs()}
            controls
            // ref={(r) => {
            //   vid.current = r
            //   createVideoFromImage("/src/assets/audio.jpeg", 1, vid.current)
            // }}
            // onPlay={(e) => setTimeout(() => vid.current?.pause(),1000)}
          >
            {data != null && <source src={URL.createObjectURL(data)} />}
            <track src="/src/assets/test.vtt" kind="subtitles" default />
          </video>
          <div
            className="transcription mb-3"
            ref={(r) => (subs.current = r)}
            style={{ overflowY: "scroll" }}
          >
            {/* <div>{tr != null && toList(tr.textTracks).flatMap(t => toList(t.cues)).length}</div> */}
            {/* {text.map((t,j) => (
              <h4 key={j}>
                <Badge bg="primary">{`${Math.floor(t.time / 60).toLocaleString(
                  "en-US",
                  { minimumIntegerDigits: 2 }
                )}:${Math.floor(t.time / 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                })}${Math.floor(t.time % 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                })}`}</Badge>
                {t.content}
              </h4>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
}

export default MediaPage;
