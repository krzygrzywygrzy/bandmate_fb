import React from "react";
import User from "../../../models/User";
import UserCardPhotos from "./UserCardPhotos";
import "./scss/userCard.css";
import SelectiveButton from "../../input/SelectiveButton";
import isValidUrl from "../../../core/isValidUrl";
import Spotify from "react-spotify-embed";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  console.log(user);

  return (
    <div className="user-card">
      <UserCardPhotos photos={user.photoUrls} />
      <section className="user-card-primary">
        {user.name} {user.surname}
      </section>
      <section>{user.description}</section>
      <section className="user-card-list">
        {user.instruments.map((instrument) => (
          <SelectiveButton
            isSelected={true}
            onClick={() => {}}
            label={instrument}
            key={instrument}
          />
        ))}
      </section>
      <section className="user-card-list">
        {user.genres.map((genre) => (
          <SelectiveButton
            isSelected={true}
            onClick={() => {}}
            label={genre}
            key={genre}
          />
        ))}
      </section>
      {user.spotify && isValidUrl(user.spotify) && (
        <section>
          <Spotify style={{ width: "100%" }} link={user.spotify} />
        </section>
      )}
    </div>
  );
};

export default UserCard;
