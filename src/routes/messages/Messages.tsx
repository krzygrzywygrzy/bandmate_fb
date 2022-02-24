import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import "./scss/messages.css";
import UserChatCard from "../../components/cards/UserChatCard/UserChatCard";
import {useLocation} from "wouter";
import Chat from "./Chat";

type Props = {
  id?: string;
}

const Messages: React.FC<Props> = ({id}) => {
  const [, setLocation] = useLocation();
  const chats = useSelector((state: RootState) => state.chats);

  if (chats.loading) return <div className="container">Loading...</div>
  if (chats.error) return <div className="container">Error :( {chats.error.message}</div>

  return chats.data ?
      <div className="messages">
        {chats.data.length > 0 ? <div className="messages-list">
          {chats.data.map((chat) => {
            return <div key={chat.id} onClick={() => setLocation(`/messages/${chat.id}`)}><UserChatCard
                displayName={`${chat.user.name} ${chat.user.surname}`}
                lastMessage={chat.lastMessage}
                image={chat.user.photoUrls}/></div>
          })}
        </div> : <div className="messages-list">
          No users to message yet!
        </div>}
        <div className="messages-chat-container">{id ? <Chat id={id}/> : <div className="empty-chat">
          Select chat to see messages...
        </div>}</div>
      </div>
      : <></>
}

export default Messages;