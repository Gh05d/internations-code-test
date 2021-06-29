import * as React from "react";
import "./styles/IconButton.scss";

interface Props {
  icon: string;
  onClick: () => void;
  title?: string;
  className?: string;
  [buttonProps: string]: any;
}

const IconButton: React.FC<Props> = ({ icon, className = "", ...rest }) => (
  <button
    {...rest}
    className={`icon-button ${className}`}
    aria-label={rest.title || `Icon Button with icon ${icon}`}
  >
    <i className={`fa fa-${icon}`} />
  </button>
);

export default IconButton;
