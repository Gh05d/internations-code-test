interface Groups {
  id?: number;
  name: string;
  users?: Users[];
}

interface Users {
  id?: number;
  name: string;
  age?: number;
  groups?: Groups[];
}
