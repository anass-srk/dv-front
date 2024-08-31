import Navbar from "./NavbarMangement";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "./static/css/tabulator_bootstrap5.min.css";
import { ReactTabulator } from "react-tabulator";
import { kingsman2_logo, kingsman_logo, Media } from "./utils";
import { DateTime } from "luxon";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import modify_logo from "./assets/rotate.svg"
import delete_logo from "./assets/trash.svg"
import yes_logo from "./assets/check.svg"
import no_logo from "./assets/xmark.svg"
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import { useNavigate } from "react-router-dom";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";

function MediaList(){
  const [showRowModal, setShowRowModal] = useState(false);
  const [showConfModal,setShowConfModal] = useState(false);
  const [media,setMedia] = useState<Media[]>([])
  const scast = useRef<Media | null>(null)
  const l = useRef<Media[]>([])
  const navigate = useNavigate()
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
        rating: (75/100)*5,
        release_date: new Date(2014,1,24).getTime(),
        tags: ['crime','adventure','comedy'],
        producer: 0,
        cast: [0,1],
      },
    ];
    setMedia(l.current)
  },[])
  
  return (
    <>
      <Navbar
        subject="media"
        filters={[
          { field: "id", type: "number" },
          { field: "title", type: "string" },
          { field: "type", type: "string" },
          { field: "rating", type: "number"},
          { field: "tags", type: "string"}
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
              if(sfs[i].filter.type == "string"){
                setMedia(
                  media.filter(
                    (c) => (c[sfs[i].filter.field as keyof typeof c] as string).includes(sfs[i].lv)
                  )
                );
              }else {
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
      <ReactTabulator
        columns={[
          // { title: "photo", field: "photo", formatter: function(cell: Tabulator.CellComponent){
          //   const img = document.createElement("img");
          //   img.src = cell.getValue();
          //   img.width = 32;
          //   img.height = 32;
          //   const div = document.createElement("div");
          //   div.style.display = 'flex';
          //   div.style.alignItems = 'center';
          //   div.style.justifyContent = 'center';
          //   div.appendChild(img);
          //   return div;
          // }},
          { title: "id", field: "id" },
          { title: "name", field: "name" },
          { title: "type", field: "type" },
          { title: "rating", field: "rating", hozAlign: "center",formatter: "star"},
          {
            title: "tags",
            field: "tags",
            formatter: MultiValueFormatter,
            formatterParams: { style: "PILL" },
            sorter: (a: string[], b: string[]) => a.sort()[0].localeCompare(b.sort()[0])
          },
          {
            title: "Release Date",
            field: "release_date",
            formatter: function (cell: Tabulator.CellComponent) {
              return DateTime.fromMillis(cell.getValue()).toFormat(
                "yyyy/MM/dd"
              );
            },
          },
        ]}
        data={media}
        events={{
          rowClick: (_e: PointerEvent, row: { getData: () => Media }) => {
            setShowRowModal(true);
            scast.current = row.getData();
          },
        }}
      />
      <Modal
        show={showRowModal}
        onHide={() => setShowRowModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Media Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>What do you want to do with this media ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRowModal(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              navigate("/cast/modify?id=" + scast.current?.id);
            }}
          >
            <img
              src={modify_logo}
              alt="modify_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowRowModal(false);
              setShowConfModal(true);
            }}
          >
            <img
              src={delete_logo}
              alt="delete_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfModal}
        onHide={() => setShowConfModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Media Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="success">
            <img
              src={yes_logo}
              alt="yes_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </Button>
          <Button variant="danger" onClick={() => setShowConfModal(false)}>
            <img
              src={no_logo}
              alt="no_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MediaList;