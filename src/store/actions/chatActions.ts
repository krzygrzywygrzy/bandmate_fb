import {ChatActionType} from "./actionTypes";
import Chat from "../../models/Chat";

type Load = {
  type: ChatActionType.LOAD,
}

type Loaded = {
  type: ChatActionType.LOADED,
  payload: Chat[],
}

type Error = {
  type: ChatActionType.ERROR,
  payload: Error,
}

type ChatActions = Load | Loaded | Error;
export default ChatActions;