import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./dexie";
import List from "./List";
import "./styles/GroupsAndUsers.scss";

interface Props {}

const Groups: React.FC<Props> = () => {
  const [create, toggleCreate] = React.useState<boolean>(false);
  const [name, editName] = React.useState<string>("");

  const groups = useLiveQuery(() => db.groups.toArray(), []);

  async function createNewGroup(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      await db.groups.add({ name, users: [] });

      editName("");
      toggleCreate(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="groups users">
      <h1>Groups</h1>
      <button
        aria-label="Create new Group"
        onClick={() => toggleCreate(oldState => !oldState)}
        className="create-button"
      >
        Create New Group
      </button>
      {create && (
        <form className="new-form" onSubmit={createNewGroup}>
          <input
            name="name"
            placeholder="Groupname"
            value={name}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              editName(e.target.value);
            }}
          />

          <button type="submit" aria-label="Submit">
            Submit
          </button>

          <button
            onClick={() => {
              editName("");
              toggleCreate(false);
            }}
            className="cancel-button"
            type="button"
          >
            Cancel
          </button>
        </form>
      )}

      {groups ? (
        groups.length > 0 ? (
          <List type="group" items={groups} />
        ) : (
          <div>Please create your first group</div>
        )
      ) : (
        <div>
          Loading... <i className="fa fa-spinner fa-spin" />
        </div>
      )}
    </div>
  );
};

export default Groups;
