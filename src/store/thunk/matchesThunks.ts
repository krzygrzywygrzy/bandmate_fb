import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SwipesActionType, UserActionType} from "../actions/actionTypes";
import SwipesAction from "../actions/swipesActions";
import UserAction from "../actions/userActions";
import {RootState} from "../store";
import {doc, updateDoc, writeBatch, runTransaction} from "firebase/firestore";
import {firestore} from "../../firebase";
import {ThunkMessages} from "../../core/exports";
import {v4 as uuid} from "uuid";
import Match from "../../models/Match";
import User from "../../models/User";

export const likeOrMatch = (
    liked: boolean
): ThunkAction<Promise<ThunkMessages>, RootState, unknown, UserAction | SwipesAction> => {
  return async (
      dispatch: ThunkDispatch<RootState, unknown, UserAction | SwipesAction>,
      getState: () => RootState
  ): Promise<ThunkMessages> => {
    try {
      if (!getState().swipes.data)
        throw Error("No more musicians to swipe on left!");


      if (liked) {
        const you = getState().user.data!;

        if (!you) throw Error("User not logged in!");

        const swipe = getState().swipes.data![0];
        if (swipe.likes.includes(you.id)) {
          const match_id = uuid();

          //match
          const batch = writeBatch(firestore);

          //create new match document with chat collection
          const matchDoc = doc(firestore, "matches", match_id);
          batch.set(matchDoc, {
            users: [you.id, swipe.id],
            id: match_id,
          });

          //update yours data
          const toUpdate = {
            likes: [...you.likes, swipe.id],
            matches: [...you.matches, match_id],
          };
          batch.update(doc(firestore, "users", you.id), toUpdate);

          //update swipe's data
          batch.update(doc(firestore, "users", swipe.id), {
            matches: [...swipe.matches, match_id],
          });

          await batch.commit();

          dispatch({
            type: UserActionType.LOADED,
            payload: {...you, ...toUpdate},
          });
        } else {
          //add swipe to your likes
          await updateDoc(doc(firestore, "users", you.id), {
            likes: [...you.likes, swipe.id],
          });
        }
      }

      //in the end just remove first user from array
      dispatch({
        type: SwipesActionType.LOADED,
        payload: getState().swipes.data!.slice(1),
      });
      return ThunkMessages.SUCCESS;
    } catch (err) {
      return ThunkMessages.ERROR;
    }
  };
};

export const unmatch = (match_id: string):
    ThunkAction<Promise<ThunkMessages>, RootState, unknown, UserAction | SwipesAction> => {
  return async (
      dispatch: ThunkDispatch<RootState, unknown, UserAction | SwipesAction>,
      getState: () => RootState,
  ): Promise<ThunkMessages> => {
    try {
      const you = getState().user.data;
      if (!you) throw Error("User not logged in!");

      const matchRef = doc(firestore, "matches", match_id);
      const yourRef = doc(firestore, "users", you.id);
      await runTransaction(firestore, async (transaction) => {
        const matchDoc = await transaction.get(matchRef);
        if (!matchDoc.exists()) {
          throw Error("Match does not exist!");
        }
        const matchData = matchDoc.data() as Match;
        const toUnmatchRef =
            doc(firestore, "users", matchData.users.filter((el) => el !== you.id)[0]);
        const toUnmatchDoc = await transaction.get(toUnmatchRef);
        if(!toUnmatchDoc.exists()) {
          throw Error("User does not exist!");
        }
        const toUnmatchData = toUnmatchDoc.data() as User;

        await transaction.set(toUnmatchRef, {
          likes: toUnmatchData.likes.filter(like=> like !== you.id),
          matches: toUnmatchData.matches.filter(match => match !== match_id),
        });

        await  transaction.set(yourRef, {
          likes: you.likes.filter(like=> like !== toUnmatchData.id),
          matches: toUnmatchData.matches.filter(match => match !== match_id),
        });

        transaction.delete(matchRef);
      });

      return ThunkMessages.SUCCESS;
    } catch (err: any) {
      return ThunkMessages.ERROR;
    }
  }
}