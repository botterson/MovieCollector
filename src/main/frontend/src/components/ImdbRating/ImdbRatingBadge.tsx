import { FC } from "react";

import classes from "./ImdbRatingBadge.module.css";

const ImDbRatingBadge: FC<{ rating: string }> = (props) => {
  return (
    <div className={classes.rating}>
      <div style={{ fontSize: "9px", textAlign: "center" }}>Score</div>
      <div style={{ fontSize: "24px", textAlign: "center", lineHeight: "1" }}>
        {props.rating}
      </div>
    </div>
  );
};

export default ImDbRatingBadge;
