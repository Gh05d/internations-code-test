import * as React from "react";
import { NavLink } from "react-router-dom";

interface Props {}

const Navigation: React.FC<Props> = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/groups" activeClassName="active">
          Groups
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" activeClassName="active">
          Users
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
