import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loadSwipes } from "../../store/thunk/swipesThunks";

const Home: React.FC = () => {
  const swipes = useSelector((state: RootState) => state.swipes);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loadSwipes());
  }, )

  if(swipes.loading) {
    return <div className="container">Loading...</div>
  }

  if(swipes.error) {
    return <div className="container">Error :( {swipes.error.message}</div>
  }

  return swipes.data ? <div className="container"></div> : <></>;
};

export default Home;
