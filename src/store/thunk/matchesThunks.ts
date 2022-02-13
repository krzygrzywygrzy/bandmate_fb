import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SwipesActionType, UserActionType } from "../actions/actionTypes";
import SwipesAction from "../actions/swipesActions";
import UserAction from "../actions/userActions";
import { RootState } from "../store";

export const likeOrMatch = (
  liked: boolean
): ThunkAction<void, RootState, unknown, UserAction | SwipesAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, UserAction | SwipesAction>,
    getState: () => RootState
  ) => {
    try {
      if (!getState().swipes.data)
        throw Error("No more musicians to swipe on left!");

      const you = getState().user;
      if (!you.data) throw Error("User not logged in!");

      if (liked) {
      } else {
        //just remove first user from array
        dispatch({
          type: SwipesActionType.LOADED,
          payload: getState().swipes.data!.slice(1),
        });
      }
    } catch (err) {}
  };
};
