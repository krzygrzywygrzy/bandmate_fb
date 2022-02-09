import { Reducer } from "redux";
import User from "../../models/User";
import { SwipesActionType } from "../actions/actionTypes";
import SwipesAction from "../actions/swipesActions";

export type SwipesState = {
  loading: boolean;
  data: User[] | null;
  error: any | null;
};

const swipesReducer: Reducer<SwipesState, SwipesAction> = (
  state = {
    loading: false,
    data: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case SwipesActionType.LOAD: {
      return { loading: true, data: null, error: null };
    }
    case SwipesActionType.LOADED: {
      return { loading: false, data: action.payload, error: null };
    }
    case SwipesActionType.ERROR: {
      return { loading: false, data: null, error: action.payload };
    }
    default:
      return state;
  }
};

export default swipesReducer;
