import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SwipesActionType} from "../actions/actionTypes";
import SwipesAction from "../actions/swipesActions";
import {RootState} from "../store";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, firestore} from "../../firebase";
import User from "../../models/User";

/**
 * thunk action that gets list of available swipes
 */
export const loadSwipes = (): ThunkAction<void,
    RootState,
    unknown,
    SwipesAction> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, SwipesAction>, getState: () => RootState,) => {
        try {
            dispatch({type: SwipesActionType.LOAD});

            const currentUser = auth.currentUser;
            if (!currentUser) throw Error("User not logged in");

            const usersRef = collection(firestore, "users");

            const swipesQuery = query(usersRef, where(
                "id", "not-in", [currentUser.uid, ...getState().user.data?.likes ?? []]));

            let swipes: User[] = [];
            const response = await getDocs(swipesQuery);
            response.forEach((doc) => {
                    swipes.push(doc.data() as User);
            });
            dispatch({type: SwipesActionType.LOADED, payload: swipes});
        } catch (err: any) {
            dispatch({type: SwipesActionType.ERROR, payload: err});
        }
    };
};
