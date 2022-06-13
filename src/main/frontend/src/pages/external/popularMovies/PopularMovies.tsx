import { FC, useEffect, useState } from "react";
import RankingSearchTable from "../../../components/search/ranking/RankingSearchTable";
import { RankingModel, SearchType } from "../../../models/ExternalModels";
import * as service from "../../../services/externalServices/ExternalService";

interface PageProperties {}

const PopularMovies: FC<PageProperties> = (props) => {
  const [results, setResults] = useState<RankingModel[]>();

  useEffect(() => {
    service
      .performTopSearch(SearchType.POPULAR_MOVIES)
      .then((data) => setResults(data));
  }, []);

  return (
    <section style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Popular Movies</h1>
      <RankingSearchTable data={results} showRankMovement={true} />
    </section>
  );
};

export default PopularMovies;
