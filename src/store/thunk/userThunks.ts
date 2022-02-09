import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth, firestore } from "../../firebase";
import { UserActionType } from "../actions/actionTypes";
import UserAction from "../actions/userActions";
import { RootState } from "../store";
import { collection, getDocs, query, where } from "firebase/firestore";
import User from "../../models/User";

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

export const logOut = (): ThunkAction<void, RootState, unknown, UserAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, UserAction>) => {
    await auth.signOut();
    dispatch({ type: UserActionType.LOG_OUT });
  };
};
