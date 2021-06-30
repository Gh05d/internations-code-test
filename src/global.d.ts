interface Group {
  id?: number;
  name: string;
  users?: Users[];
}

interface User {
  id?: number;
  name: string;
  age?: number;
  groups?: Groups[];
}
