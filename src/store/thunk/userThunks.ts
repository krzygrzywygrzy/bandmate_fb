import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {auth, firestore} from "../../firebase";
import {UserActionType} from "../actions/actionTypes";
import UserAction from "../actions/userActions";
import {RootState} from "../store";
import {collection, doc, getDocs, query, updateDoc, where,} from "firebase/firestore";
import User, {UserPrimary} from "../../models/User";
import {ThunkMessages} from "../../core/exports";

/**
 * ThunkAction that gets current's user data
 */
export const getUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  UserAction
> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, UserAction>) => {
    try {
      dispatch({ type: UserActionType.LOAD });

      if (!auth.currentUser) throw Error("User not logged in");

      const usersRef = collection(firestore, "users");
      const userQuery = query(
        usersRef,
        where("id", "==", auth.currentUser!.uid)
      );

      const response = await getDocs(userQuery);
      if (response.empty) throw Error("User not found!");

      dispatch({
        type: UserActionType.LOADED,
        payload: response.docs[0].data() as User,
      });
    } catch (err: any) {
      dispatch({ type: UserActionType.ERROR, payload: err });
    }
  };
};

/**
 * ThunkAction that signs user out form Firebase Auth and returns reducer to initial state
 */
export const logOut = (): ThunkAction<void, RootState, unknown, UserAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, UserAction>) => {
    await auth.signOut();
    dispatch({ type: UserActionType.LOG_OUT });
  };
};

/**
 * ThunkAction that updates name, surname and description of user
 * @param toUpdate
 */
export const updatePrimaryData = (
  toUpdate: UserPrimary
): ThunkAction<Promise<ThunkMessages>, RootState, unknown, UserAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, UserAction>,
    getState: () => RootState
  ): Promise<ThunkMessages> => {
    try {
      if (!auth.currentUser) throw Error("User not logged in");

      //update doc
      const userRef = doc(firestore, "users", auth.currentUser!.uid);
      await updateDoc(userRef, toUpdate);

      const user = getState().user;
      dispatch({
        type: UserActionType.LOADED,
        payload: { ...user.data!, ...toUpdate },
      });
      return ThunkMessages.SUCCESS;
    } catch (err: any) {
      return ThunkMessages.ERROR;
    }
  };
};
