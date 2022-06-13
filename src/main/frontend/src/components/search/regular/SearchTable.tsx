import { PlusOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import Table, { ColumnsType, TableProps } from "antd/lib/table";
import Column from "antd/lib/table/Column";
import { FC, useState } from "react";
import { QuickSearchModel } from "../../../models/PersonalModels";
import AddToCollection from "../../../pages/personal/addToCollection/AddToCollection";
import ErrorDialog, { ErrorType } from "../../errorDialog/ErrorDialog";
import ModalDialog from "../../modalDialog/ModalDialog";
import * as PersonalSvc from "../../../services/personalServices/PersonalService";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface PageProperties {
  data: any;
}

interface PageState {
  addDialog?: boolean;
  errorDialog?: boolean;
  errorTitle?: string;
  errorMessage?: string;
}

const SearchTable: FC<PageProperties> = (props) => {
  const [selectedItem, setSelectedItem] = useState<QuickSearchModel>();
  const [pageState, setPageState] = useState<PageState>({});

  const addItemHandler = (item: QuickSearchModel) => {
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
          key="action"
          title="Action"
          width={80}
          render={(_: any, record: QuickSearchModel) => (
            <Button
              key="btnAction"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => addItemHandler(record)}
            />
          )}
        />
        <Column
          key="image"
          dataIndex="image"
          width={100}
          align="center"
          render={(image) => <Image key={"image"} src={image} />}
        />
        <Column key="title" dataIndex="title" title="Title" />
        <Column
          key="resultType"
          dataIndex="resultType"
          title="Result Type"
          width={100}
        />
        <Column key="description" dataIndex="description" title="Description" />
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
      {pageState.addDialog && (
        <AddToCollection
          movie={selectedItem}
          imDbRating={undefined} //selectedItem?.imDbRating
          imDbRatingCount={undefined} //selectedItem?.imDbRatingCount
          onFinish={onConfirm}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default SearchTable;
