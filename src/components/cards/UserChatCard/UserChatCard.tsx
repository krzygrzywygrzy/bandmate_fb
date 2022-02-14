import React from "react";
import useGetPhotoUrl from "../../../core/useGetPhotoUrl";
import "./scss/userChatCard.css";

type Props = {
  displayName: string;
  lastMessage: string;
  image: string[];
}

const UserChatCard: React.FC<Props> = (
    {displayName, lastMessage, image}) => {
  const {data} = useGetPhotoUrl(image);

  return <div className="user-chat-card">
    <div className="user-chat-card-avatar">
      {data && data.length > 0 ? <div>
        <img src={data[0]} alt="" />
      </div>: <div>
        no img
      </div>}
    </div>
    <div>
      <span>{displayName}</span>
    </div>
  </div>
}

export default UserChatCard;