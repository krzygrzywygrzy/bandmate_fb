import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import "./scss/messages.css";
import UserChatCard from "../../components/cards/UserChatCard/UserChatCard";

const Messages: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chats);

  if (chats.loading) return <div className="container">Loading...</div>
  if (chats.error) return <div className="container">Error :( {chats.error.message}</div>

  return chats.data ?
      <div className="container messages">
        {chats.data.length > 0 ? <div className="messages-list">

          {chats.data.map((chat) => {
            return <UserChatCard
                key={chat.id}
                displayName={`${chat.user.name} ${chat.user.surname}`}
                lastMessage={"No messages yet!"}
                image={chat.user.photoUrls}/>
          })}
        </div> : <div></div>}
      </div>
      : <></>
}

export default Messages;