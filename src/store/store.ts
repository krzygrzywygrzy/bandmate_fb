import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import swipesReducer from "./reducers/swipesReducer";
import userReducer from "./reducers/userReducer";
import chatReducer from "./reducers/chatReducer";
import messagesReducer from "./reducers/messagesReducer";

//root reducer
export const rootReducer = combineReducers({
  user: userReducer,
  swipes: swipesReducer,
  chats: chatReducer,
  messages: messagesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

//store
export default createStore(rootReducer, applyMiddleware(thunk));
