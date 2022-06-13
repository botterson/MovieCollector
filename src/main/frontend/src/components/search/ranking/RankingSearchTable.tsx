import { PlusOutlined } from "@ant-design/icons";
import { Table, Image, Button, Modal } from "antd";
import Column from "antd/lib/table/Column";
import { FC, useState } from "react";
import { RankingModel } from "../../../models/ExternalModels";
import AddToCollection from "../../../pages/personal/addToCollection/AddToCollection";
import * as PersonalSvc from "../../../services/personalServices/PersonalService";
import ErrorDialog, { ErrorType } from "../../errorDialog/ErrorDialog";
import ModalDialog from "../../modalDialog/ModalDialog";

interface PageProperties {
  showRankMovement?: boolean;
  data?: RankingModel[];
}

interface PageState {
  addDialog?: boolean;
  errorDialog?: boolean;
  errorTitle?: string;
  errorMessage?: string;
}

const RankingSearchTable: FC<PageProperties> = (props) => {
  const [selectedItem, setSelectedItem] = useState<RankingModel>();
  const [pageState, setPageState] = useState<PageState>({});

  const addItemHandler = (item: RankingModel) => {
    console.log("addItemHandler: item=", item);
    setSelectedItem(() => item);
    setPageState((state) => ({ ...state, addDialog: true }));
  };

  const onConfirm = (values: any) => {
    setPageState((state) => ({ ...state, addDialog: false }));
    try {
      PersonalSvc.addToCollection(values).then(
        (data) => {},
        (error) => {
          console.log("REJECTED = {}", error);
          setPageState((state) => ({
            ...state,
            errorTitle: "Add To Collection Failed!",
            errorMessage: error,
            errorDialog: true,
          }));
        }
      );
    } catch (err: any) {
      console.log("Handling Error = {}", err);
      setPageState((state) => ({
        ...state,
        errorMessage: err,
        errorDialog: true,
        addDialog: false,
      }));
    }
  };

  const onClose = () => {
    setPageState((state) => ({
      ...state,
      addDialog: false,
      errorDialog: false,
    }));
  };

  return (
    <>
      <Table bordered dataSource={props.data} scroll={{ y: 600 }}>
        <Column
          title="Action"
          key="action"
          width={80}
          render={(_: any, record: RankingModel) => (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => addItemHandler(record)}
            />
          )}
        />
        <Column
          title="Current Ranking"
          dataIndex="rank"
          key="rank"
          width={100}
          align="center"
        />
        {!!props.showRankMovement && (
          <Column
            title="Ranking Movement"
            dataIndex="rankUpDown"
            key="rankUpDown"
            width="50px"
            align="center"
          />
        )}
        <Column
          title=""
          dataIndex="image"
          key="image"
          width="100px"
          align="center"
          render={(image) => <Image src={image} />}
        />
        <Column title="Title" dataIndex="title" key="title" />
        <Column
          title="IMDB Rating"
          dataIndex="imDbRating"
          key="imDbRating"
          width="100px"
          align="center"
        />
        <Column
          title="IMDB Rating Count"
          dataIndex="imDbRatingCount"
          key="imDbRatingCount"
          width="100px"
          align="center"
        />
      </Table>
      {pageState.errorDialog && (
        <ModalDialog onCancel={onConfirm}>
          <ErrorDialog
            type={ErrorType.ERROR}
            title={pageState.errorTitle}
            message={pageState.errorMessage}
            onClose={onClose}
          />
        </ModalDialog>
      )}
      {
        pageState.addDialog && (
          <AddToCollection
            movie={selectedItem}
            imDbRating={selectedItem?.imDbRating}
            imDbRatingCount={selectedItem?.imDbRatingCount}
            onFinish={onConfirm}
            onClose={onClose}
          />
        )
        // </Modal>
      }
    </>
  );
};

export default RankingSearchTable;
