import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Row, Tag } from "antd";
import * as PersonalService from "../../../services/personalServices/PersonalService";
import { PersonalModel } from "../../../models/PersonalModels";
import CollectionList from "../collectionList/CollectionList";

interface PageState {
  movies: PersonalModel[];
}

const PersonalHomePage = () => {
  const [pageState, setPageState] = useState<PageState>({ movies: [] });

  useEffect(() => {
    console.log("PersonalHomePage: loading movies...");
    onDataRefresh();
  }, []);

  const onDataRefresh = () => {
    PersonalService.getAllMovies().then((data) =>
      setPageState((state) => ({
        ...state,
        movies: data,
      }))
    );
  };

  return (
    <>
      <Row gutter={[32, 32]} align={"middle"} style={{ padding: "10px 0" }}>
        <Col span={8} style={{ textAlign: "start" }}>
          {/* <Button type="primary" shape="round" size={"middle"}>
            Add Movie
          </Button> */}
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "0" }}>Personal Movie Collection</h1>
        </Col>
        <Col span={8} style={{ textAlign: "end" }}>
          <Tag color="green">
            {pageState.movies ? pageState.movies.length : 0} Movies
          </Tag>
        </Col>
      </Row>
      <Divider style={{ margin: "5px 0" }} />
      <CollectionList data={pageState.movies} onDataRefresh={onDataRefresh} />
    </>
  );
};

export default PersonalHomePage;
