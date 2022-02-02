import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

//root reducer
export const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;

//store
export default createStore(rootReducer, applyMiddleware(thunk));
