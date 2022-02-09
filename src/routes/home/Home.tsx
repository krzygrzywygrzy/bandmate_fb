import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loadSwipes } from "../../store/thunk/swipesThunks";
import "./scss/home.css";

const Home: React.FC = () => {
  const swipes = useSelector((state: RootState) => state.swipes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSwipes());
  });

  if (swipes.loading) {
    return <div className="container home">Loading...</div>;
  }

  if (swipes.error) {
    return (
      <div className="container home">Error :( {swipes.error.message}</div>
    );
  }

  return swipes.data ? <div className="container home"></div> : <></>;
};

export default Home;
