import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";

//root reducer
export const rootReducer = combineReducers({
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

//store
export default createStore(rootReducer, applyMiddleware(thunk));
