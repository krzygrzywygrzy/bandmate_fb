import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import ChatActions from "../actions/chatActions";
import {ChatActionType} from "../actions/actionTypes";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import Match from "../../models/Match";
import chat from "../../models/Chat";
import User from "../../models/User";
import chatActions from "../actions/chatActions";

export const loadChats = ():
    ThunkAction<void, RootState, unknown, ChatActions> => {
  return async (
      dispatch: ThunkDispatch<RootState, unknown, ChatActions>,
      getState: () => RootState,
  ) => {
    try {
      dispatch({type: ChatActionType.LOAD});

      const user = getState().user.data;
      if (!user) throw Error("User not logged in!");

      if (user.matches.length > 0) {
        const matchesQuery = query(
            collection(firestore, "matches"),
            where("id", "in", user.matches));

        let chats: chat[] = [];
        const matchesSnapshots = await getDocs(matchesQuery);
        for (let match of matchesSnapshots.docs) {
          const data = match.data() as Match;
          //get data of swipe
          const swipeId: string = data.users.filter((el) => el !== user.id)[0];
          const swipe = await getDoc(doc(firestore, "users", swipeId));
          chats.push(
              {
                lastMessage: data.lastMessage,
                user: swipe.data() as User,
                id: match.id,
              }
          );
        }
        dispatch({type: ChatActionType.LOADED, payload: chats});
      } else {
        dispatch({type: ChatActionType.LOADED, payload: []});
      }
    } catch (err: any) {
      console.log(err);
      dispatch({type: ChatActionType.ERROR, payload: err});
    }
  }
}

export const updateChatList = (match: Match):
    ThunkAction<void, RootState, unknown, chatActions> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, ChatActions>) => {
    console.log(match);
  }
}