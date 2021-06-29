import * as React from "react";
import List from "./List";
import "./styles/Groups.scss";

interface Props {}

const Groups: React.FC<Props> = props => {
  return (
    <div id="groups">
      <h1>Groups</h1>
      <button className="create-button">Create New Group</button>
      <List />
    </div>
  );
};

export default Groups;
