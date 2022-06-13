import { FC, useEffect } from "react";
import { Form, Modal } from "antd";

import "antd/dist/antd.css";
import Image from "antd/lib/image";
import { BaseModel } from "../../../models/CommonModels";
import FormatSelector from "../../../components/formatSelector/FormatSelector";
import { useForm } from "antd/lib/form/Form";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const AddToCollection: FC<{
  movie?: BaseModel;
  imDbRating?: string;
  imDbRatingCount?: string;
  onFinish?: any;
  onClose?: any;
}> = (props) => {
  const [form] = useForm();

  useEffect(() => {}, [props.movie]);

  const onFinish = (values: any) => {
    console.log("values = ", values);
    props.onFinish(values);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={true}
      onOk={() => form.submit()}
      onCancel={props.onClose}
    >
      <Form form={form} {...layout} onFinish={onFinish}>
        <Form.Item hidden name="key" initialValue={props.movie?.key} />
        <Form.Item style={{ textAlign: "center" }}>
          <h2>{props.movie?.title}</h2>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Image src={props.movie?.image} preview={false} height={250} />
        </Form.Item>
        <Form.Item label="IMDB Rating:">
          {props.imDbRating && (
            <span>
              {props.imDbRating} ({props.imDbRatingCount})
            </span>
          )}
        </Form.Item>
        <FormatSelector />
      </Form>
    </Modal>
  );
};

export default AddToCollection;
