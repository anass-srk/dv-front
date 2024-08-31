import Navbar from "./NavbarMangement";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "./static/css/tabulator_bootstrap5.min.css";
import {  kingsman2_logo, kingsman_logo, Media } from "./utils";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import MediaCard from "./MediaCard";

function MediaSearch() {
  const [media, setMedia] = useState<Media[]>([]);
  const l = useRef<Media[]>([]);
  useEffect(() => {
    l.current = [
      {
        id: 0,
        title: "Kingsman: The Golden Circle",
        type: "video",
        img: kingsman_logo,
        data: "asd-ad213mda",
        release_date: new Date(2017, 8, 22).getTime(),
        tags: ["action", "adventure", "comedy"],
        producer: 0,
        cast: [0, 1],
        rating: 3.5,
      },
      {
        id: 1,
        title: "Kingsman: The Secret Service",
        type: "audio",
        img: kingsman2_logo,
        data: "asd-asd2-12",
        rating: (75 / 100) * 5,
        release_date: new Date(2014, 1, 24).getTime(),
        tags: ["crime", "adventure", "comedy"],
        producer: 0,
        cast: [0, 1],
      },
    ];
    setMedia(l.current);
  }, []);

  return (
    <>
      <Navbar
        subject="media"
        filters={[
          { field: "id", type: "number" },
          { field: "title", type: "string" },
          { field: "type", type: "string" },
          { field: "rating", type: "number" },
          { field: "tags", type: "string" },
        ]}
        onChange={(sfs) => {
          setMedia(l.current);
          for (let i = 0; i < sfs.length; ++i) {
            const rv = sfs[i].rv;
            if (rv != null) {
              setMedia(
                media.filter(
                  (c) =>
                    c[sfs[i].filter.field as keyof typeof c] >= sfs[i].lv &&
                    c[sfs[i].filter.field as keyof typeof c] <= rv
                )
              );
            } else {
              if (sfs[i].filter.type == "string") {
                setMedia(
                  media.filter((c) =>
                    (
                      c[sfs[i].filter.field as keyof typeof c] as string
                    ).includes(sfs[i].lv)
                  )
                );
              } else {
                setMedia(
                  media.filter(
                    (c) => c[sfs[i].filter.field as keyof typeof c] == sfs[i].lv
                  )
                );
              }
            }
          }
        }}
      />
      {media.length == 0 && (
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
          The media library is empty
        </Alert>
      )}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        alignContent: "start"
      }}>
        {Array(10)
          .fill(0, 0, 10)
          .map(() =>
            media.map((m, i) => (
              // <Card
              //   key={(i + 1) * (_ + 1)}
              //   // className="col-sm-6 col-md-4 col-lg-2"
              //   style={{width: "200px",padding:"0px"}}
              // >
              //   <Card.Img
              //     variant="top"
              //     src={m.img}
              //     style={{minWidth: "100%",height: "225px"}}
              //     // className="media-card-img"
              //     // onLoad={(e) => {
              //     //   e.currentTarget.style.height = `${e.currentTarget.width*4/3}px`;
              //     // }}
              //   ></Card.Img>
              //   <Card.Body>
              //     <Card.Title>Card Title</Card.Title>
              //     <Card.Text>
              //       Some quick example text to build on the card title and make
              //       up the bulk of the card's content.
              //     </Card.Text>
              //   </Card.Body>
              // </Card>
              <MediaCard media={m} key={i}/>
            ))
          )}
      </div>
    </>
  );
}

export default MediaSearch;
