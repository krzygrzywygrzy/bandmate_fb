import React from "react";

type Props = {
  displayName: string;
  lastMessage: string;
  image: string;
}

const UserChatCard: React.FC<Props> = (
    {displayName, lastMessage, image}) => {
  return <div className="container"></div>
}

export default UserChatCard;