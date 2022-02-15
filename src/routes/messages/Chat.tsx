import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import "./scss/messages.css";
import { FiSend} from "react-icons/fi";

type Props = {
  id: string;
}

const Chat: React.FC<Props> = ({id}) => {
  const chat = useSelector(
      (state: RootState) =>
          state.chats.data!.filter((chat)=> chat.id === id)[0]);

  return <div className="chat">
    <header>{chat.user.name} {chat.user.surname}</header>
    <section className="chat-messages">
      messages
    </section>
    <section className="chat-input">
      <input placeholder="type something..."/><div><FiSend size={24} /></div>
    </section>
  </div>;
}

export default Chat;