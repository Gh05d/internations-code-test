import * as React from "react";
import List from "./List";
import "./styles/GroupsAndUsers.scss";

interface Props {}

const Groups: React.FC<Props> = props => {
  const [create, toggleCreate] = React.useState<boolean>(false);
  const [name, editName] = React.useState<string>("");
  const [age, editAge] = React.useState<string>("");

  function createNewUser() {}

  return (
    <div className="users">
      <h1>Users</h1>
      <button
        onClick={() => toggleCreate(oldState => !oldState)}
        className="create-button"
      >
        Create New User
      </button>
      {create && (
        <form className="new-form">
          <input
            name="name"
            placeholder="Username"
            value={name}
            onChange={e => editName(e.target.value)}
          />
          <input
            name="age"
            placeholder="Age"
            type="number"
            min={1}
            max={120}
            value={age}
            onChange={e => editAge(e.target.value)}
          />

          <button>Submit</button>
        </form>
      )}
      {/* <List /> */}
    </div>
  );
};

export default Groups;
