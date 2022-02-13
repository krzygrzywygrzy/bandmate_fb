import React from "react";
import User from "../../../models/User";
import UserCardPhotos from "./UserCardPhotos";
import "./scss/userCard.css";
import SelectiveButton from "../../input/SelectiveButton";
import isValidUrl from "../../../core/isValidUrl";
import Spotify from "react-spotify-embed";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-card">
      <UserCardPhotos photos={user.photoUrls} />
      <section className="like-dislike">
        <div className="like-dislike-button ">
          <FiThumbsUp size={24} />
          <span>like</span>
        </div>
        <div className="like-dislike-button">
          <FiThumbsDown size={24} />
          <span>dislike</span>
        </div>
      </section>
      <section className="user-card-primary">
        {user.name} {user.surname}
      </section>
      <section>{user.description}</section>
      <section className="user-card-list">
        <span>Instruments</span>
        <div>
          {user.instruments.map((instrument) => (
            <SelectiveButton
              isSelected={true}
              onClick={() => {}}
              label={instrument}
              key={instrument}
            />
          ))}
        </div>
      </section>
      <section className="user-card-list">
        <span>Genres</span>
        <div>
          {user.genres.map((genre) => (
            <SelectiveButton
              isSelected={true}
              onClick={() => {}}
              label={genre}
              key={genre}
            />
          ))}
        </div>
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
