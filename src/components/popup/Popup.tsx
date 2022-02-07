import React from "react";
import "./scss/popup.css";

type Props = {
  trigger?: boolean;
};

const Popup: React.FC<Props> = ({ trigger, children }) => {
  return trigger ? <div className="popup">{children}</div> : <></>;
};

export default Popup;
