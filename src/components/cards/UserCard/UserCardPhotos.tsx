import React from "react";
import useGetPhotoUrls from "../../../core/useGetPhotoUrl";
import "./scss/userCard.css";

type Props = {
  photos: string[];
};

const UserCardPhotos: React.FC<Props> = ({ photos }) => {
  const { loading, data, error } = useGetPhotoUrls(photos);

  if (loading)
    return <div className="user-card-photos photo-message ">Loading...</div>;

  if (error)
    return (
      <div className="user-card-photos photo-message ">
        Could not load photos :(
      </div>
    );

  return data && data.length > 0 ? (
    <div className="user-card-photos">
      <img src={data[0]} alt="" />
    </div>
  ) : (
    <div className="user-card-photos photo-message">
      <div>This user haven't shared any photos</div>
    </div>
  );
};

export default UserCardPhotos;
