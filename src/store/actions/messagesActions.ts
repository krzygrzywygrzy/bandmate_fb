import {MessagesActionType} from "./actionTypes";
import Message from "../../models/Message";

type Load = {
  type: MessagesActionType.LOAD,
}

type Loaded = {
  type: MessagesActionType.LOADED,
  payload: Message[],
}

type Error = {
  type: MessagesActionType.ERROR,
  payload: Error,
}

type MessagesAction = Load | Loaded | Error;
export default MessagesAction;