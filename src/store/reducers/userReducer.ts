import { Reducer } from "redux";
import User from "../../models/User";
import { UserActionType } from "../actions/actionTypes";
import UserAction from "../actions/userActions";

export type UserState = {
  loading: boolean;
  data: User | null;
  error: any | null;
};

const userReducer: Reducer<UserState> = (
  state = { loading: false, data: null, error: null },
  action: UserAction
) => {
  switch (action.type) {
    case UserActionType.LOAD: {
      return { loading: true, data: null, error: null };
    }
    case UserActionType.LOADED: {
      return { loading: false, data: action.payload, error: null };
    }
    case UserActionType.ERROR: {
      return { loading: false, data: null, error: action.payload };
    }
    default:
      return state;
  }
};
export default userReducer;
