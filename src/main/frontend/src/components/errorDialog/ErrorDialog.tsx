import { Button, Card, Space } from "antd";
import { FC } from "react";

import classes from "./ErrorDialog.module.css";

export enum ErrorType {
  INFO,
  WARNING,
  ERROR,
}

interface PageParameter {
  title?: string;
  message?: string;
  type: ErrorType;
  onClose: any;
}

const ErrorDialog: FC<PageParameter> = (props) => {
  return (
    <Card className={classes.modal}>
      <h1 style={{ textAlign: "center" }}>{props.title}</h1>
      <p>{props.message}</p>
      <div
        style={{
          paddingTop: "30px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button type="primary" onClick={props.onClose}>
          Close
        </Button>
      </div>
    </Card>
  );
};

export default ErrorDialog;
