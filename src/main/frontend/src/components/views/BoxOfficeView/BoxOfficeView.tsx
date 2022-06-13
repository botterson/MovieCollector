import { FC } from "react";
import { Row, Col } from "antd";
import { BoxOffice } from "../../../models/PersonalModels";

import classes from "./BoxOfficeView.module.css";

const BoxOfficeView: FC<{ stats: BoxOffice }> = (props) => {
  return (
    <section className={classes.products}>
      <Row justify="center">
        <Col span={7}>Budget:</Col>
        <Col span={8}>{props.stats.budget}</Col>
      </Row>
      <Row justify="center">
        <Col span={7}>Worldwide Gross:</Col>
        <Col span={8}>{props.stats.cumulativeWorldwideGross}</Col>
      </Row>
      <Row justify="center">
        <Col span={7}>USA Gross:</Col>
        <Col span={8}>{props.stats.grossUSA}</Col>
      </Row>
      <Row justify="center">
        <Col span={7}>USA Opening Weekend:</Col>
        <Col span={8}>{props.stats.openingWeekendUSA}</Col>
      </Row>
    </section>
  );
};

export default BoxOfficeView;
