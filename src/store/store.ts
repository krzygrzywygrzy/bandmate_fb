import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import swipesReducer from "./reducers/swipesReducer";
import userReducer from "./reducers/userReducer";

//root reducer
export const rootReducer = combineReducers({
  user: userReducer,
  swipes: swipesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

//store
export default createStore(rootReducer, applyMiddleware(thunk));
