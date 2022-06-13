import { Card, Col, Row, Tabs, Image, Tag, Space, Button } from "antd";
import { FC, useState } from "react";
import TypeBadge from "../../../components/badges/typeBadge/TypeBadge";
import ContentRatingBadge from "../../../components/contentRating/ContentRatingBadge";
import FormatBadge from "../../../components/formatBadge/FormatBadge";
import ImDbRatingBadge from "../../../components/ImdbRating/ImdbRatingBadge";
import BoxOfficeView from "../../../components/views/BoxOfficeView/BoxOfficeView";
import ItemListView from "../../../components/views/ItemListView/ItemListView";
import { DetailMovie } from "../../../models/PersonalModels";

import classes from "./ViewMovieDetails.module.css";

const { TabPane } = Tabs;

interface PageProperties {
  movie: DetailMovie;
  onClose: any;
}

const ViewMovieDetails: FC<PageProperties> = (props) => {
  return (
    <Card className={classes.modal}>
      <Row
        justify="center"
        style={{
          backgroundColor: "grey",
          padding: "5px",
          marginBottom: "15px",
        }}
      >
        <Col span={24}>
          <Row gutter={[8, 16]} align="middle">
            <Col span={2} style={{ height: "100%" }}>
              <ContentRatingBadge rating={props.movie.contentRating} />
            </Col>

            <Col span={20} style={{ textAlign: "center" }}>
              {props.movie.type && <TypeBadge type={props.movie.type} />}
              <div style={{ fontSize: "24px" }}>{props.movie.title}</div>
            </Col>

            <Col span={2}>
              <ImDbRatingBadge rating={props.movie.imDbRating} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={14}>
          <Row gutter={[8, 8]} align="middle">
            <Col span={24} style={{ marginBottom: "10px" }}>
              {props.movie.plot}
            </Col>

            <Col span={4}>Year Released:</Col>
            <Col span={8}>{props.movie.year}</Col>
            <Col span={4}>Runtime:</Col>
            <Col span={8}>{props.movie.runtimeStr}</Col>

            <Col span={4}>Genres:</Col>
            <Col span={16}>
              {props.movie.genreList.map((i) => i.value).join(", ")}
            </Col>
            <Col span={7}>Format(s) in Collection:</Col>
            <Col span={16}>
              {props.movie.formatList.map((i) => (
                <FormatBadge id={i.id} key={i.id} />
              ))}
            </Col>
            <Col span={24} style={{ marginTop: "10px" }}>
              <Tabs type="card">
                <TabPane tab="Actors" key="actorTab">
                  <ItemListView list={props.movie.actorList} />
                </TabPane>
                <TabPane tab="Directors" key="directorTab">
                  <ItemListView list={props.movie.directorList} />
                </TabPane>
                <TabPane tab="Writers" key="writerTab">
                  <ItemListView list={props.movie.writerList} />
                </TabPane>
                <TabPane tab="Companies" key="companyTab">
                  <ItemListView list={props.movie.companyList} />
                </TabPane>
                <TabPane tab="Box Office" key="boxOfficeTab">
                  <BoxOfficeView stats={props.movie.boxOffice} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
        <Col
          span={10}
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <Image src={props.movie.image} width={400} />
        </Col>
      </Row>
      <Space
        align="center"
        style={{ width: "100%", display: "flex", flexFlow: "Column" }}
      >
        <Button type="primary" size={"large"} onClick={props.onClose}>
          Close
        </Button>
      </Space>
    </Card>
  );
};

export default ViewMovieDetails;
