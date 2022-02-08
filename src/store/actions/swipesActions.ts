import User from "../../models/User";
import { SwipesActionType } from "./actionTypes";

interface Load {
    type: SwipesActionType.LOAD;
}

interface Loaded {
    type: SwipesActionType.LOADED;
    payload: User[];
}

interface Error {
    type: SwipesActionType.ERROR;
    payload: Error;
}

type SwipesAction = Load | Loaded | Error;
export default SwipesAction;