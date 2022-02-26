import React, { useEffect } from "react";
import "./scss/popup.css";

type Props = {
  trigger?: boolean;
  close: Function;
};

const MatchPopup: React.FC<Props> = ({ trigger, close }) => {
  useEffect(() => {
    setTimeout(close, 4000);
  }, []);

  return trigger ? <div className="match-popup">It's a match</div> : <></>;
};

export default MatchPopup;
