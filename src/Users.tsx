import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import List from "./List";
import { db } from "./dexie";

import "./styles/GroupsAndUsers.scss";

interface Props {}

const Groups: React.FC<Props> = () => {
  const [create, toggleCreate] = React.useState<boolean>(false);
  const [name, editName] = React.useState<string>("");
  const [age, editAge] = React.useState<number | undefined>();
  const [userGroup, setGroup] = React.useState<number | string | null>(null);

  const users = useLiveQuery(() => db.users.toArray(), []);
  const groups = useLiveQuery(() => db.groups.toArray(), []);

  async function createNewUser(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = { name, age, groups: [] };

      if (userGroup && userGroup !== "none") {
        // @ts-ignore
        data.groups = [userGroup];
      }

      const userID = await db.users.add(data);

      if (userGroup && userGroup !== "none") {
        // @ts-ignore
        await db.groups
          .where("id")
          .equals(userGroup)
          .modify((x: Group) => {
            // @ts-ignore
            x.users.push(userID);
          });
      }

      setGroup("none");
      editAge(undefined);
      editName("");
      toggleCreate(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLoading() {
    if (!groups || !users) {
      return (
        <div>
          Loading... <i className="fa fa-spinner fa-spin" />
        </div>
      );
    }

    if (groups.length === 0) {
      return (
        <p>
          You have to create a group first before you can create users. Please
          go to{" "}
          <Link className="inline-link" to="/groups">
            Groups
          </Link>
          .
        </p>
      );
    }

    if (users.length === 0) {
      return <div>Please create your first user</div>;
    }

    return <List type="user" items={users} />;
  }

  return (
    <div className="users">
      <h1>Users</h1>
      {groups && groups.length > 0 && (
        <button
          onClick={() => toggleCreate(oldState => !oldState)}
          className="create-button"
        >
          Create New User
        </button>
      )}
      {create && (
        <form className="new-form" onSubmit={createNewUser}>
          <input
            name="name"
            placeholder="Username"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              editName(e.target.value)
            }
          />
          <input
            name="age"
            placeholder="Age"
            type="number"
            required
            min={1}
            max={120}
            value={age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              editAge(parseInt(e.target.value))
            }
          />

          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setGroup(parseInt(e.target.value))
            }
          >
            <option value={"none"}>Please select a group</option>
            {groups &&
              groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
          </select>

          <button>Submit</button>
        </form>
      )}

      {handleLoading()}
    </div>
  );
};

export default Groups;
