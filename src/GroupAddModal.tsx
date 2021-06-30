import * as React from "react";
import Dexie from "dexie";
import Modal from "./Modal";

interface Props {
  id: number;
  close: () => void;
  allGroups: Group[];
  db: { users: Dexie.Table<User>; groups: Dexie.Table<Group> };
  name: string;
  groups: number[];
}

const GroupAddModal: React.FC<Props> = (props: Props) => {
  const { close, allGroups, groups } = props;
  const filteredGroups = allGroups.filter(
    group => groups && !groups.find(gID => gID === group.id)
  );

  const [checkedState, setCheckedState] = React.useState(
    new Array(filteredGroups.length).fill(false)
  );

  function handleChange(position: number) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await props.db.users
      .where("id")
      // @ts-ignore
      .equals(props.id)
      .modify((x: Group) => {
        checkedState.forEach((value, position) => {
          if (value) {
            // @ts-ignore
            x.groups.push(filteredGroups[position].id);
          }
        });
      });

    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        await props.db.groups
          .where("id")
          // @ts-ignore
          .equals(filteredGroups[i].id)
          .modify((x: User) => {
            // @ts-ignore
            x.users.push(props.id);
          });
      }
    }

    close();
  }

  return (
    <Modal header="Add Groups" close={close}>
      <React.Fragment>
        <div>Assign the user {props.name} to new groups</div>
        <form className="checkboxes-form" onSubmit={handleSubmit}>
          {filteredGroups.map((group, index) => (
            <div key={group.id} className="checkbox-container">
              <input
                id={`group-${group.id}`}
                type="checkbox"
                value={group.id}
                checked={checkedState[index]}
                onChange={() => handleChange(index)}
              />
              <label htmlFor={`group-${group.id}`} key={`group-${group.id}`}>
                {group.name}
              </label>
            </div>
          ))}
          <div className="button-group">
            <button className="cancel-button" onClick={close}>
              Cancel
            </button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </React.Fragment>
    </Modal>
  );
};

export default GroupAddModal;
