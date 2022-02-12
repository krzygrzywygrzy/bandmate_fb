import React from "react";
import User from "../../../models/User";
import UserCardPhotos from "./UserCardPhotos";
import "./scss/userCard.css";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-card">
      <UserCardPhotos photos={user.photoUrls} />
    </div>
  );
};

export default UserCard;
