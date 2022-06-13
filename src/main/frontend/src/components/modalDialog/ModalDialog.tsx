import React, { FC } from "react";
import { MouseEventHandler } from "react";
import ReactDOM from "react-dom";

import classes from "./ModalDialog.module.css";

export const Backdrop: FC<{
  onCancel: MouseEventHandler<HTMLDivElement>;
}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

const ModalDialog: FC<{
  onCancel: MouseEventHandler;
  children: any;
}> = (props) => {
  const backdrop = document.getElementById("backdrop-root");
  const overlay = document.getElementById("overlay-root");

  return (
    <React.Fragment>
      {backdrop &&
        ReactDOM.createPortal(<Backdrop onCancel={props.onCancel} />, backdrop)}
      {overlay && ReactDOM.createPortal(props.children, overlay)}
    </React.Fragment>
  );
};
export default ModalDialog;
