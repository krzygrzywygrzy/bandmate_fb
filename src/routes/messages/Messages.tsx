import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import AuthWrapper from "../../components/AuthWrapper";
import "./scss/messages.css";

const Messages: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chats);

  if(chats.loading) return <div className="container">Loading...</div>
  if(chats.error) return  <div className="container">Error :( {chats.error.message}</div>

  return chats.data ? <AuthWrapper>
    <div className="container messages">
      <div>
        {chats.data.map((chat) => {
          return <div key={chat.id}>
            {chat.user.name}
          </div>
        })}
      </div>
    </div>
  </AuthWrapper>: <></>
}

export default Messages;