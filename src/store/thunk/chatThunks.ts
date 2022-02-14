import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import ChatActions from "../actions/chatActions";
import {ChatActionType} from "../actions/actionTypes";
import {collection, query, where, getDocs} from "firebase/firestore";
import {firestore} from "../../firebase";

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

      const matchesQuery = query(
          collection(firestore, "matches"),
          where("id", "in", user.matches),);
      const matchesSnapshots = await getDocs(matchesQuery);
      matchesSnapshots.forEach((match)=> {
        //TODO: get data of user
      })



    } catch (err: any) {
      dispatch({type: ChatActionType.ERROR, payload: err});
    }
  }
}