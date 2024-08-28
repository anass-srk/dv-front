import Navbar from "./NavbarCast";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "./static/css/tabulator_bootstrap5.min.css";
import { ReactTabulator } from "react-tabulator";
import { cast } from "./utils";
import { DateTime } from "luxon";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import modify_logo from "./assets/rotate.svg"
import delete_logo from "./assets/trash.svg"
import yes_logo from "./assets/check.svg"
import no_logo from "./assets/xmark.svg"

const photo =
  "data:image/octet-stream;base64,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";

const l: cast[] = [
  {
    id: 0,
    name: "Adam Dumdum",
    gender: "male",
    birthday: new Date("09/09/1999").toISOString(),
    photo: photo
  },
  {
    id: 1,
    name: "Dam Dumdum",
    gender: "male",
    birthday: new Date("08/09/2000").toISOString(),
    photo: photo
  }
];

function CastList(){
  const [showRowModal, setShowRowModal] = useState(false);
  const [showConfModal,setShowConfModal] = useState(false);
  
  return (
    <>
      <Navbar />
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
              const outputFormat = "dd/MM/yyyy";
              const value = cell.getValue();
              return DateTime.fromISO(value).toFormat(outputFormat);
            },
          },
        ]}
        data={l}
        events={{
          rowClick: (_e: PointerEvent, row: { getData(): () => cast }) => {
            setShowRowModal(true);
            console.log(row!.getData());
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
          <Button variant="success">
            <img
              src={modify_logo}
              alt="modify_logo"
              className="white-svg"
              width={24}
              height={24}
            />
          </Button>
          <Button variant="danger" onClick={() => {
            setShowRowModal(false);
            setShowConfModal(true);
          }}>
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