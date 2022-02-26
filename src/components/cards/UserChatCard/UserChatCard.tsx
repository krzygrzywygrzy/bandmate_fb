import React from "react";
import useGetPhotoUrl from "../../../core/useGetPhotoUrl";
import "./scss/userChatCard.css";
import Message from "../../../models/Message";

type Props = {
  displayName: string;
  lastMessage?: Message;
  image: string[];
};

const UserChatCard: React.FC<Props> = ({ displayName, lastMessage, image }) => {
  const { data } = useGetPhotoUrl(image);

  return (
    <div className={`user-chat-card`}>
      <div className="user-chat-card-avatar">
        {data && data.length > 0 ? (
          <div>
            <img
              src={data[0]}
              alt=""
              className={data && "user-chat-card-avatar-border"}
            />
          </div>
        ) : (
          <div className="user-chat-card-avatar">no img</div>
        )}
      </div>
      <div className="user-chat-card-info">
        <span>{displayName}</span>
        {/*<span className="user-chat-card-info-last-msg">{lastMessage ? new Date(lastMessage.sent).toDateString() : ""} * {lastMessage ? lastMessage.content: "No messages yet!"}</span>*/}
      </div>
    </div>
  );
};

export default UserChatCard;
