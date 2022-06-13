import { Tag } from "antd";
import React, { FC, useContext, useState } from "react";
import FormatContext from "../../context/FormatContext";

const FormatBadge: FC<{ id: React.Key }> = (props) => {
  const formatContext = useContext(FormatContext);

  const [formatValue] = useState<string | undefined>(
    formatContext.formats?.find((item) => {
      return item.id === props.id;
    })?.value
  );

  const tagColor = () => {
    if (formatValue === "DVD") return "purple";
    if (formatValue === "HD Disc") return "blue";
    if (formatValue === "4K Disc") return "gold";
    if (formatValue === "Digital") return "green";
  };

  return (
    <Tag key={props.id} color={tagColor()}>
      {formatValue}
    </Tag>
  );
};

export default FormatBadge;
