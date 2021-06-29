import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Navigation: React.FC<Props> = () => (
  <nav>
    <ul>
      <li>
        <Link to="/groups">Groups</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
