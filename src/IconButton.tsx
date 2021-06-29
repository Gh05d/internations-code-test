import * as React from "react";
import "./styles/IconButton.scss";

interface Props {
  icon: string;
  onClick: () => void;
  title?: string;
  [buttonProps: string]: any;
}

const IconButton: React.FC<Props> = ({ icon, ...rest }) => (
  <button className="icon-button" {...rest}>
    <i className={`fa fa-${icon}`} />
  </button>
);

export default IconButton;
