import { useLiveQuery } from "dexie-react-hooks";
import * as React from "react";
import { db } from "./dexie";
import GroupAddModal from "./GroupAddModal";
import IconButton from "./IconButton";
import Modal from "./Modal";
import "./styles/List.scss";

interface Props {
  id?: number;
  name: string;
  age?: number;
  groups?: number[];
  users?: User[];
  type: "user" | "group";
}

const ListItem: React.FC<Props> = props => {
  const allGroups = useLiveQuery(() => db.groups.toArray(), []);
  const allUsers = useLiveQuery(() => db.users.toArray(), []);
  const [modalBody, setModalBody] = React.useState<React.ReactElement | null>(
    null
  );

  const { type } = props;

  if (!allGroups || !allUsers) {
    return (
      <div>
        Loading <i className="fa fa-spinner fa-spin" />
      </div>
    );
  }

  function appeaseTypescript() {
    if (
      type === "user" &&
      props.groups &&
      props.groups.length > 0 &&
      allGroups
    ) {
      return props.groups.map(group => {
        const matchedGroup = allGroups.find(g => g.id === group);

        return (
          <div key={`group-${group}`} className="list-and-trash">
            <div>{matchedGroup?.name}</div>
            <IconButton
              icon="trash"
              title="Remove user from group"
              onClick={async () => {
                await db.users
                  .where("id")
                  // @ts-ignore
                  .equals(props.id)
                  .modify((x: User) => {
                    // @ts-ignore
                    const newGroups = x.groups.filter(g => g !== group);
                    x.groups = newGroups;
                  });

                await db.groups
                  .where("id")
                  // @ts-ignore
                  .equals(group)
                  .modify((x: Group) => {
                    // @ts-ignore
                    const newGroups = x.users.filter(g => g !== props.id);
                    x.users = newGroups;
                  });
              }}
            />
          </div>
        );
      });
    }

    if (type === "group" && props.users && props.users.length > 0 && allUsers) {
      return props.users.map(userID => (
        <div key={`user-${userID}`} className="list-and-trash">
          {/* @ts-ignore */}
          <div>{allUsers.find(u => u.id === userID)?.name}</div>
          <IconButton
            title="Remove user from group"
            icon="trash"
            onClick={async () => {
              await db.groups
                .where("id")
                // @ts-ignore
                .equals(props.id)
                .modify((x: Group) => {
                  // @ts-ignore
                  const newGroups = x.users.filter(u => u !== userID);
                  x.users = newGroups;
                });

              await db.users
                .where("id")
                // @ts-ignore
                .equals(userID)
                .modify((x: User) => {
                  // @ts-ignore
                  const newGroups = x.groups.filter(g => g !== props.id);
                  x.groups = newGroups;
                });
            }}
          />
        </div>
      ));
    }
  }

  function add() {
    if (type === "user") {
      setModalBody(
        <GroupAddModal
          // @ts-ignore
          id={props.id}
          db={db}
          // @ts-ignore
          allGroups={allGroups}
          // @ts-ignore
          groups={props.groups}
          name={props.name}
          close={() => setModalBody(null)}
        />
      );
    }
  }

  async function deleteEntry() {
    await db[type === "user" ? "users" : "groups"].delete(props.id);
  }

  function deleteItem() {
    const buttonGroup = (
      <div className="button-group">
        <button className="cancel-button" onClick={() => setModalBody(null)}>
          Cancel
        </button>
        <button onClick={deleteEntry} type="submit">
          Confirm
        </button>
      </div>
    );

    if (type === "user") {
      if (props.groups && props.groups.length === 0) {
        setModalBody(
          <Modal header="Delete user" close={() => setModalBody(null)}>
            <React.Fragment>
              <div>Do you want to delete the user {props.name}?</div>
              {buttonGroup}
            </React.Fragment>
          </Modal>
        );
      } else {
        setModalBody(
          <Modal header="Delete groups first" close={() => setModalBody(null)}>
            <div>
              Before deleting the user, make sure he is not assigned to any
              groups.
            </div>
          </Modal>
        );
      }
    }

    if (type === "group") {
      if (props.users && props.users.length === 0) {
        setModalBody(
          <Modal header="Delete group" close={() => setModalBody(null)}>
            <React.Fragment>
              <div>Do you want to delete the group {props.name}?</div>
              {buttonGroup}
            </React.Fragment>
          </Modal>
        );
      } else {
        setModalBody(
          <Modal header="Delete groups first" close={() => setModalBody(null)}>
            <div>
              Before deleting the group, make sure no users are assigned.
            </div>
          </Modal>
        );
      }
    }
  }

  return (
    <li className="list-item">
      <img
        alt="A nice user"
        // Adding some random seed to ensure that the photos are unique
        src={`https://picsum.photos/seed/${
          type === "user" ? "user" : "group"
        }-${props.id}/50`}
        height={50}
        width={50}
      />
      <div className="name">{props.name}</div>
      <div className="age">{props.age} </div>

      <div className="controls">
        {type === "user" && (
          <IconButton title="Add Group" onClick={add} icon="user-plus" />
        )}
        <IconButton
          title={`Delete ${type === "user" ? "User" : "Group"}`}
          onClick={deleteItem}
          icon="trash"
        />
      </div>

      <div className="sub-category">{appeaseTypescript()}</div>

      {modalBody}
    </li>
  );
};

export default ListItem;
