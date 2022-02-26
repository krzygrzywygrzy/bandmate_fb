import React, { useState } from "react";
import User from "../../../models/User";
import UserCardPhotos from "./UserCardPhotos";
import "./scss/userCard.css";
import SelectiveButton from "../../input/SelectiveButton";
import isValidUrl from "../../../core/isValidUrl";
import Spotify from "react-spotify-embed";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { likeOrMatch } from "../../../store/thunk/matchesThunks";
import { ThunkMessages } from "../../../core/exports";
import MatchPopup from "../../popup/MatchPopup";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();

  const [matchPopup, setMatchPopup] = useState<boolean>(false);

  const [message, setMessage] = useState<string | null>(null);
  const handleLiking = async () => {
    const res: any = await dispatch(likeOrMatch(true, showMatchPopup));
    if (res === ThunkMessages.ERROR) {
      setMessage("Error occurred while processing this action!");
    } else setMessage(null);
  };

  const showMatchPopup = () => setMatchPopup(true);

  return (
    <div className="user-card">
      <UserCardPhotos photos={user.photoUrls} />
      <section className="like-dislike">
        <div className="like-dislike-button" onClick={handleLiking}>
          <FiThumbsUp size={24} />
          <span>like</span>
        </div>
        <div
          className="like-dislike-button"
          onClick={() => dispatch(likeOrMatch(false, () => {}))}
        >
          <FiThumbsDown size={24} />
          <span>dislike</span>
        </div>
      </section>
      {message && <section className="user-card-message">{message}</section>}
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
      <MatchPopup trigger={matchPopup} close={() => setMatchPopup(false)} />
    </div>
  );
};

export default UserCard;
