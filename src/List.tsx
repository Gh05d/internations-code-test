import * as React from "react";
import ListItem from "./ListItem";
import "./styles/List.scss";

interface Props {
  items: Group[] | User[];
  type: "user" | "group";
}

const List: React.FC<Props> = props => {
  return (
    <ul className="list">
      {props.items.map((item: Group | User) => (
        <ListItem type={props.type} key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default List;
