import { FC, useContext, useEffect, useState } from "react";
import { Form, Select } from "antd";
import { FormatModel } from "../../models/CommonModels";
import FormatContext from "../../context/FormatContext";

const { Option } = Select;

const FormatSelector: FC<{}> = (props) => {
  const form = Form.useFormInstance();
  const [selectedValues, setSelectedValues] = useState<FormatModel[]>([]);
  const formatContext = useContext(FormatContext);

  useEffect(() => {
    const values = form.getFieldValue("format");
    console.log("FormatSelector: selectedValues=", values);

    setSelectedValues(() => values);
  }, [form]);

  return (
    <Form.Item key="editFormat" name="format" rules={[{ required: true }]}>
      <Select
        id="format"
        mode="multiple"
        allowClear
        placeholder="Select Video Format"
        style={{ width: "100%" }}
      >
        {formatContext.formats.map((item: FormatModel) => (
          <Option key={item.id} value={item.id}>
            {item.value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FormatSelector;
