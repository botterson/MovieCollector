import { FC } from "react";

import classes from "./ContentRatingBadge.module.css";

const ContentRatingBadge: FC<{ rating: string }> = (props) => {
  return <div className={classes.rating}>{props.rating}</div>;
};

export default ContentRatingBadge;
