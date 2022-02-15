import {Reducer} from "redux";
import MessagesAction from "../actions/messagesActions";
import Message from "../../models/Message";
import {MessagesActionType} from "../actions/actionTypes";

type MessagesState = {
  loading: boolean,
  data: Message[] | null,
  error: any | null;
}

const messagesReducer:
    Reducer<MessagesState, MessagesAction> = (
    state: MessagesState = {loading: false, data: null, error: null},
    action: MessagesAction) => {
  switch (action.type) {
    case MessagesActionType.LOAD:
      return {loading: true, data: null, error: null};
    case MessagesActionType.LOADED:
      return {loading: false, data: action.payload, error: null};
    case MessagesActionType.ERROR:
      return {loading: false, data: null, error: action.payload};
    default:
      return state;
  }
}
export default messagesReducer;