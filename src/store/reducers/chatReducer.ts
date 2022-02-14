import chat from "../../models/Chat";
import {Reducer} from "redux";
import ChatActions from "../actions/chatActions";
import {ChatActionType} from "../actions/actionTypes";

type ChatState = {
  loading: boolean,
  data: chat[] | null,
  error: any | null,
}

const chatReducer: Reducer<ChatState, ChatActions> = (
    state: ChatState = {loading: false, data: null, error: null,},
    action
) => {
  switch (action.type) {
    case ChatActionType.LOAD: {
      return {loading: true, data: null, error: null};
    }
    case ChatActionType.LOADED: {
      return {loading: false, data: action.payload, error: null};
    }
    case ChatActionType.ERROR: {
      return {loading: false, data: null, error: action.payload};
    }
    default:
      return state;
  }
}

export default chatReducer;