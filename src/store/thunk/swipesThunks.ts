import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SwipesActionType } from "../actions/actionTypes";
import SwipesAction from "../actions/swipesActions";
import { RootState } from "../store";

export const loadSwipes = (): ThunkAction<
  void,
  RootState,
  unknown,
  SwipesAction
> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, SwipesAction>) => {
    try {
      dispatch({ type: SwipesActionType.LOAD });
      //TODO: get list of users
    } catch (err: any) {
      dispatch({ type: SwipesActionType.ERROR, payload: err });
    }
  };
};
