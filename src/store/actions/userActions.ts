import User from "../../models/User";
import { UserActionType } from "./actionTypes";

interface Load {
  type: UserActionType.LOAD;
}

interface Loaded {
  type: UserActionType.LOADED;
  payload: User;
}

interface Error {
  type: UserActionType.ERROR;
  payload: Error;
}

interface LogOut {
  type: UserActionType.LOG_OUT;
}

type UserAction = Load | Loaded | Error | LogOut;

export default UserAction;
