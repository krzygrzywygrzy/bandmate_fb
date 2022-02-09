import React from "react";
import User from "../../models/User";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  return <div>UserCard</div>;
};

export default UserCard;
