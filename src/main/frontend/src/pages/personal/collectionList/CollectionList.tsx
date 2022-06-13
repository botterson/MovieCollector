import { DeleteFilled } from "@ant-design/icons";
import { Table, Space, Form, Popconfirm, Typography } from "antd";
import Column from "antd/lib/table/Column";
import React, { FC, useEffect, useState } from "react";
import FormatBadge from "../../../components/formatBadge/FormatBadge";
import FormatSelector from "../../../components/formatSelector/FormatSelector";
import ModalDialog from "../../../components/modalDialog/ModalDialog";
import { FormatModel } from "../../../models/CommonModels";
import { DetailMovie, PersonalModel } from "../../../models/PersonalModels";
import * as PersonalService from "../../../services/personalServices/PersonalService";
import ViewMovieDetails from "../viewMovieDetails/ViewMovieDetails";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: any;
  record: PersonalModel;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <>
          {/* {children} */}
          <FormatSelector />
        </>
      ) : (
        children
      )}
    </td>
  );
};

interface PageProperties {
  data?: PersonalModel[];
  onDataRefresh: any;
}

const CollectionList: FC<PageProperties> = (props) => {
  const [form] = Form.useForm();
  const [detailDialog, setDetailDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DetailMovie>();
  const [data, setData] = useState<PersonalModel[]>();
  const [editingKey, setEditingKey] = useState<React.Key>();

  const isEditing = (record: PersonalModel) => record.key === editingKey;

  const edit = (record: Partial<PersonalModel>) => {
    form.setFieldsValue({ format: [], ...record });
    setEditingKey(record.key);
  };

  useEffect(() => {
    console.log("Props data has changed!!! ", props.data);
    setData(() => (props.data ? props.data : []));
  }, [props.data]);

  const onViewRecord = (row: any) => {
    console.log("onViewRecord: row=", row);
    if (row.key) {
      PersonalService.getMovieById(row.key).then((movie) => {
        setSelectedItem(() => movie);
        setDetailDialog(() => true);
      });
    }
  };

  const onDeleteRecord = (row: any) => {
    PersonalService.deleteItem(row.key).then((updatedData) =>
      props.onDataRefresh()
    );
  };

  const onCancelDialog = () => {
    setDetailDialog(() => false);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };

  const save = async (key?: React.Key) => {
    try {
      if (!key || !data) {
        setEditingKey(undefined);
        return;
      }

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        if (item.key) {
          const row = await form.validateFields();

          PersonalService.updateFormat(item.key, row.format).then(
            (updatedData) => {
              newData[index] = updatedData;
              setData(() => newData);
            }
          );
        }
      }

      setEditingKey(undefined);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  return (
    <>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          pagination={{ showSizeChanger: true }}
          scroll={{ y: 600 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        >
          <Column
            key="title"
            title="Title"
            dataIndex="title"
            width={500}
            showSorterTooltip={false}
            sorter={(a: PersonalModel, b: PersonalModel) => {
              if (a.title && b.title) {
                if (a.title?.toLowerCase() < b.title?.toLowerCase()) return -1;
                if (a.title?.toLowerCase() > b.title?.toLowerCase()) return 1;
              }
              return 0;
            }}
          />
          <Column key="type" title="Type" dataIndex="type" width={100} />
          <Column
            key="format"
            title="Format(s)"
            dataIndex="format"
            width={280}
            render={(record: any[]) =>
              record.map((item: FormatModel) => (
                <FormatBadge key={item.id} id={item.id} />
              ))
            }
            filters={[
              { text: "DVD", value: "DVD" },
              { text: "HD Disc", value: "HD Disc" },
              { text: "4K Disc", value: "4K Disc" },
              { text: "Digital", value: "Digital" },
            ]}
            onFilter={(value, record: any) => {
              const formatString = record.format
                .map((item: any) => item.format)
                .join(", ");
              return formatString.indexOf(value) !== -1;
            }}
            onCell={(record: PersonalModel) => ({
              record,
              dataIndex: "format",
              title: "Format(s)",
              editing: isEditing(record),
            })}
          />
          <Column key="crew" title="Stars" dataIndex="crew" />
          <Column
            key="imDbRating"
            title="IMDB Rating"
            dataIndex="imDbRating"
            width="100px"
            align="center"
          />
          <Column
            key="action"
            title="Action"
            width={175}
            render={(_: any, record: PersonalModel) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link
                    onClick={() => save(record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Typography.Link>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Space size="middle">
                  <Typography.Link
                    disabled={!!editingKey}
                    onClick={() => onViewRecord(record)}
                  >
                    View
                  </Typography.Link>
                  <Typography.Link
                    disabled={!!editingKey}
                    onClick={() => edit(record)}
                  >
                    Edit
                  </Typography.Link>

                  <Popconfirm
                    icon={<DeleteFilled style={{ color: "red" }} />}
                    title="Delete!!! Are you sure？"
                    placement="leftBottom"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDeleteRecord(record)}
                  >
                    <Typography.Link disabled={!!editingKey}>
                      Delete
                    </Typography.Link>
                  </Popconfirm>
                </Space>
              );
            }}
          />
        </Table>
      </Form>
      {detailDialog && selectedItem && (
        <ModalDialog onCancel={onCancelDialog}>
          <ViewMovieDetails movie={selectedItem} onClose={onCancelDialog} />
        </ModalDialog>
      )}
    </>
  );
};

export default CollectionList;
