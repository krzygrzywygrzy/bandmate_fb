import React, { useEffect } from "react";
import useGetPhotoUrls from "../../../core/useGetPhotoUrl";
import "./scss/userCard.css";

type Props = {
  photos: string[];
};

const UserCardPhotos: React.FC<Props> = ({ photos }) => {
  const { loading, data, error } = useGetPhotoUrls(photos);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Could not load photos :(</div>;

  return data && data.length > 0 ? (
    <div className="user-card-photos">
      <img src={data[0]} />
    </div>
  ) : (
    <div className="user-card-photos">This user didn't share any photos</div>
  );
};

export default UserCardPhotos;
