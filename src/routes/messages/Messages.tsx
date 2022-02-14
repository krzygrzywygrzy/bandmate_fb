import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const Messages: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chats);
  return <div className="container">
    {JSON.stringify(chats)}
  </div>
}

export default  Messages;