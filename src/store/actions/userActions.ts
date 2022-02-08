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

type UserAction = Load | Loaded | Error;

export default UserAction;
