import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SwipesActionType, UserActionType } from "../actions/actionTypes";
import SwipesAction from "../actions/swipesActions";
import UserAction from "../actions/userActions";
import { RootState } from "../store";
import { writeBatch, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

export const likeOrMatch = (
  liked: boolean
): ThunkAction<void, RootState, unknown, UserAction | SwipesAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, UserAction | SwipesAction>,
    getState: () => RootState
  ) => {
    try {
      if (!getState().swipes.data)
        throw Error("No more musicians to swipe on left!");

      if (liked) {
        const you = getState().user;
        if (!you.data) throw Error("User not logged in!");
        const swipe = getState().swipes.data![0];
        if (swipe.likes.includes(you.data!.id)) {
          //match
          const batch = writeBatch(firestore);

          //create new match document
          const matchDoc = doc(firestore, "matches");
          batch.set(matchDoc, {
            users: [you.data.id, swipe.id],
          });

          //update yours data
          const toUpdate = {
            likes: [...you.data.likes, swipe.id],
            matches: [...you.data.matches, matchDoc.id],
          };
          batch.update(doc(firestore, "users", you.data.id), toUpdate);

          //update swipe's data
          batch.update(doc(firestore, "users", swipe.id), {
            matches: [...swipe.matches, matchDoc.id],
          });

          await batch.commit();

          dispatch({
            type: UserActionType.LOADED,
            payload: { ...you.data, ...toUpdate },
          });
        } else {
          //add swipe to your likes
          await updateDoc(doc(firestore, "users", you.data.id), {
            likes: [...you.data.likes, swipe.id],
          });
        }
      }

      //in the end just remove first user from array
      dispatch({
        type: SwipesActionType.LOADED,
        payload: getState().swipes.data!.slice(1),
      });
    } catch (err) {}
  };
};
