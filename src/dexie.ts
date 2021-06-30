import Dexie from "dexie";

class AppDb extends Dexie {
  groups!: Dexie.Table<Group>;
  users!: Dexie.Table<User>;

  constructor() {
    super("AppDb");
    this.version(1).stores({
      groups: "++id,name,users",
      users: "++id,name,age,groups",
    });
  }
}

const db = new AppDb();

export { db };
