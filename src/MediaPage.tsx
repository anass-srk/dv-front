import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Alert, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Cast, kingsman_logo, MediaElem, photo } from "./utils";
import { DateTime } from "luxon";
import Star from "./Star";

function MediaPage() {
  const _id = useParams().id;
  const id = _id == null ? NaN : Number(_id);

  const _cast: Cast[] = [
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

  const _media: MediaElem = {
    id: 0,
    title: "Kingsman: The Golden Circle",
    desc: "The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency's ultra-competitive training program just as a global threat emerges from a twisted tech genius.",
    type: "video",
    img: kingsman_logo,
    data: "asd-ad213mda",
    release_date: new Date(2017, 8, 22).getTime(),
    tags: ["action", "adventure", "comedy"],
    producer: _cast[0],
    cast: _cast,
    rating: 3.5,
  };

  const [media, setMedia] = useState<MediaElem | null>(null);

  useEffect(() => {
    setMedia(_media);
  }, []);

  return (
    <>
      <Navbar />
      {isNaN(id) || media == null ? (
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
        <div style={{ color: "black" }}>
          <div className="media-header">
            <div
              ref={(e) => {
                if (e != null) e.style.backgroundImage = `url(${media.img})`;
              }}
              style={{
                width: "100%",
                height: "480px",
                zIndex: "-1",
                position: "absolute",
                filter: "blur(50px) contrast(50%)",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <img src={media.img} width={320} height={475} />
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
              <h5>
                <Badge bg="secondary">
                  {DateTime.fromMillis(media.release_date).toFormat(
                    "dd LLL yyyy"
                  )}
                </Badge>
              </h5>
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
            {Array(120)
              .fill(0, 0, 20)
              .map((_, i) =>
                media.cast
                  .filter((c) => c != media.producer)
                  .map((c, j) => (
                    <div key={i}>
                      <img src={c.photo} width={183} height={275} />
                      <h5>
                        {c.name}
                        {i}
                      </h5>
                    </div>
                  ))
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default MediaPage;
