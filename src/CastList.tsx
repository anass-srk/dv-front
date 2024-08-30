import Navbar from "./NavbarMangement";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "./static/css/tabulator_bootstrap5.min.css";
import { ReactTabulator } from "react-tabulator";
import { Cast, photo } from "./utils";
import { DateTime } from "luxon";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import modify_logo from "./assets/rotate.svg"
import delete_logo from "./assets/trash.svg"
import yes_logo from "./assets/check.svg"
import no_logo from "./assets/xmark.svg"
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import { useNavigate } from "react-router-dom";

function CastList(){
  const [showRowModal, setShowRowModal] = useState(false);
  const [showConfModal,setShowConfModal] = useState(false);
  const [cast,setCast] = useState<Cast[]>([])
  const scast = useRef<Cast | null>(null)
  const l = useRef<Cast[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    l.current = [
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
    setCast(l.current)
  },[])
  
  return (
    <>
      <Navbar
        subject="cast"
        filters={[
          {
            field: "id",
            type: "number",
          },
          {
            field: "name",
            type: "string",
          },
          {
            field: "gender",
            type: "string",
          },
          {
            field: "birthday",
            type: "datetime",
          },
        ]}
        onChange={(sfs) => {
          setCast(l.current);
          for (let i = 0; i < sfs.length; ++i) {
            const rv = sfs[i].rv;
            if (rv != null) {
              setCast(
                cast.filter(
                  (c) =>
                    c[sfs[i].filter.field as keyof typeof c] >= sfs[i].lv &&
                    c[sfs[i].filter.field as keyof typeof c] <= rv
                )
              );
            } else {
              if(sfs[i].filter.type == 'string'){
                setCast(
                  cast.filter(
                    (c) =>  (c[sfs[i].filter.field as keyof typeof c] as string).includes(sfs[i].lv)
                  )
                );
              }else{
                setCast(
                  cast.filter(
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
          { title: "gender", field: "gender" },
          {
            title: "Date Of Birth",
            field: "birthday",
            formatter: function (cell: Tabulator.CellComponent) {
              return DateTime.fromMillis(cell.getValue()).toFormat(
                "yyyy/MM/dd"
              );
            },
          },
        ]}
        data={cast}
        events={{
          rowClick: (_e: PointerEvent, row: { getData: () => Cast }) => {
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
          <Modal.Title>Cast Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>What do you want to do with this cast member ?</Modal.Body>
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
          <Modal.Title>Cast Management</Modal.Title>
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

export default CastList;