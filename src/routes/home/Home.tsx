import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Home: React.FC = () => {
  const swipes = useSelector((state: RootState) => state.swipes);

  return swipes.data ? <div></div> : <></>;
};

export default Home;
