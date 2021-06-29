import * as React from "react";
import Dexie from "dexie";
import IconButton from "./IconButton";
import "./styles/List.scss";

interface Props {
  items: any;
}

const List: React.FC<Props> = props => {
  console.log("FIRE ~ file: List.tsx ~ line 10 ~ props", props);
  return (
    <ul className="list">
      <li className="list-item">
        <img
          alt="A nice user"
          src="https://source.unsplash.com/random/50x50"
          height={50}
          width={50}
        />
        <div className="name">Heidi</div>
        <div className="age">26</div>

        <div className="controls">
          <IconButton
            title="Edit User"
            onClick={() => console.log("💩")}
            icon="edit"
          />
          <IconButton
            title="Delete User"
            onClick={() => console.log("💩")}
            icon="trash"
          />
        </div>
      </li>
    </ul>
  );
};

export default List;
