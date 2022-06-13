import { message } from "antd";
import { FC, useEffect, useState } from "react";
import ErrorDialog, {
  ErrorType,
} from "../../../components/errorDialog/ErrorDialog";
import ModalDialog from "../../../components/modalDialog/ModalDialog";
import RankingSearchTable from "../../../components/search/ranking/RankingSearchTable";
import { RankingModel, SearchType } from "../../../models/ExternalModels";
import * as service from "../../../services/externalServices/ExternalService";

interface PageProperties {}

interface PageState {
  errorDialog?: boolean;
  errorMessage?: string;
}

const TopRankingMovies: FC<PageProperties> = (props) => {
  const [results, setResults] = useState<RankingModel[]>();
  const [pageState, setPageState] = useState<PageState>({});

  useEffect(() => {
    try {
      service.performTopSearch(SearchType.TOP_MOVIES).then(
        (data) => {
          console.log("performTopSearch GOOD!!!!");
          setResults(data);
        },
        (error) => {
          console.log("performTopSearch BAD!!!!  ", error);
          setPageState((state) => ({
            ...state,
            errorMessage: error,
            errorDialog: true,
          }));
        }
      );
    } catch (err: any) {
      console.log("performTopSearch Error Caught!!!!  ", err);
      setPageState((state) => ({
        ...state,
        errorMessage: err,
        errorDialog: true,
      }));
    }
  }, []);

  const onClose = () => {
    setPageState((state) => ({ ...state, errorDialog: false }));
  };

  return (
    <section style={{ padding: "0px 50px" }}>
      <h1 style={{ textAlign: "center", padding: "20px 0" }}>
        Top Ranking Movies
      </h1>
      <RankingSearchTable data={results} />
      {pageState.errorDialog && (
        <ModalDialog onCancel={onClose}>
          <ErrorDialog
            type={ErrorType.ERROR}
            message={pageState.errorMessage}
            onClose={onClose}
          />
        </ModalDialog>
      )}
    </section>
  );
};

export default TopRankingMovies;
