import { FC } from "react";

import classes from "./ItemListView.module.css";

const ItemListView: FC<{ list: any[] }> = (props) => {
  return (
    <section className={classes.products}>
      <ul>
        {props.list.map((item) => (
          <li key={item.id} className={classes.item}>
            {item.name}
            {item.title && ` (${item.title})`}
            {item.asCharacter && ` as ${item.asCharacter}`}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemListView;
