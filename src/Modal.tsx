import * as React from "react";
import IconButton from "./IconButton";
import "./styles/Modal.scss";

interface Props {
  header: string;
  children: React.ReactChild;
  close: () => void;
}

const Modal = (props: Props) => {
  return (
    <div className="overlay">
      <div className="modal">
        <IconButton
          title="Close Modal"
          icon="times"
          className="modal-close"
          onClick={props.close}
        ></IconButton>
        <h2>{props.header}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
