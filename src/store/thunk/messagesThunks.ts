import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import MessagesAction from "../actions/messagesActions";
import {MessagesActionType} from "../actions/actionTypes";
import {collection, getDocs, query, where, doc, setDoc, writeBatch} from "firebase/firestore";
import {firestore} from "../../firebase";
import Message from "../../models/Message";
import {ThunkMessages} from "../../core/exports";
import ChatActions from "../actions/chatActions";
import {v4 as uuid} from "uuid";

export const getMessages = (id: string):
    ThunkAction<void, RootState, unknown, MessagesAction> => {
  return async (
      dispatch: ThunkDispatch<RootState, unknown, MessagesAction>) => {
    try {
      dispatch({type: MessagesActionType.LOAD});
      const coll = collection(firestore, "messages");
      const messagesQuery = query(coll, where("chat_id", "==", id));

      let messages: Message[] = [];
      const response = await getDocs(messagesQuery);
      response.forEach((doc) => {
        messages.push(doc.data() as Message);
      });
      dispatch({type: MessagesActionType.LOADED, payload: messages});
    } catch (err: any) {
      dispatch({type: MessagesActionType.ERROR, payload: err});
    }
  }
}

export const sendMessage = (chat_id: string, content: string):
    ThunkAction<Promise<ThunkMessages>, RootState, unknown, MessagesAction | ChatActions> => {
  return async (
      dispatch: ThunkDispatch<RootState, unknown, MessagesAction | ChatActions>,
      getState: ()=> RootState,
  ): Promise<ThunkMessages> => {
    try {
      const user = getState().user.data;
      if(!user) throw Error();

      const batch = writeBatch(firestore);
      const newMessage: Message = {
        sent: Date.now(),
        chat_id,
        content,
        user_id: user.id,
      }

      const messageDoc = doc(firestore, "messages", uuid());
      batch.set(messageDoc, {lastMessage: newMessage});
      batch.update(doc(firestore, "matches", chat_id), newMessage);
      await batch.commit();

      return ThunkMessages.SUCCESS;
    } catch (err: any) {
      console.log(err);
      return  ThunkMessages.ERROR;
    }
  }
}