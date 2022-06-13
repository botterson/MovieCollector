import { Tag } from "antd";
import { FC } from "react";

const TypeBadge: FC<{ type: string }> = (props) => {
  const tagColor = () => {
    if (props.type === "Movie") {
      return "green";
    } else if (props.type === "TVSeries") {
      return "purple";
    }
  };

  return (
    <Tag
      key={props.type}
      color={tagColor()}
      style={{ borderRadius: "14px", fontSize: "12px" }}
    >
      {props.type}
    </Tag>
  );
};

export default TypeBadge;
