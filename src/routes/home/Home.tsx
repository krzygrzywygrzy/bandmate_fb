import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/cards/UserCard/UserCard";
import { RootState } from "../../store/store";
import { loadSwipes } from "../../store/thunk/swipesThunks";
import { getUser } from "../../store/thunk/userThunks";
import "./scss/home.css";

const Home: React.FC = () => {
  const swipes = useSelector((state: RootState) => state.swipes);
  const user = useSelector((state: RootState) => state.swipes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSwipes());
    if (!user.data) dispatch(getUser());
  }, []);

  if (swipes.loading || user.loading) {
    return <div className="container home">Loading...</div>;
  }

  if (swipes.error) {
    return (
      <div className="container home">Error :( {swipes.error.message}</div>
    );
  }

  return swipes.data && user.data ? (
    <div className="container home">
      {swipes.data.length > 0 ? (
        <div className="home-user-display">
          <UserCard user={swipes.data[0]} />
        </div>
      ) : (
        <div className="home-zero-swipes">
          <header>Nothing to display!</header>
          <p>Come back later to find your bandmates!</p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Home;
