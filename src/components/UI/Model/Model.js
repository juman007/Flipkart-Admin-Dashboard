import React from "react";
import { Button, Modal } from "react-bootstrap";

const NewModel = (props) => {
   return (
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>{props.modelTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{props.children}</Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={props.handleClose}>
               {props.button}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default NewModel;
