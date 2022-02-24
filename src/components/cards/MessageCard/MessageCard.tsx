import React from "react";
import "./scss/message_card.css";
import Message from "../../../models/Message";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

type Props = {
  message: Message
}

const MessageCard: React.FC<Props> = ({message}) => {
  const userId = useSelector((state: RootState) => state.user.data!.id);

  return <div className="message-wrapper"><div className={`message-card ${message.user_id === userId ? "message-card-yours" : "message-card-not-yours"}`}>
    {message.content}
  </div></div>
}

export default MessageCard;