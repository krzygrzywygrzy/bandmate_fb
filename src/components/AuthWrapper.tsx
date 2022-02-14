import React, {useEffect, useCallback} from "react";
import {useLocation} from "wouter";
import {auth} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../store/thunk/userThunks";
import {loadChats} from "../store/thunk/chatThunks";
import {onAuthStateChanged} from "firebase/auth";
import {RootState} from "../store/store";


const AuthWrapper: React.FC = ({children}) => {
    const [, setLocation] = useLocation();
    const goHome = useCallback(() => setLocation("/"), [setLocation]);

    const dispatch = useDispatch();
    const state = useSelector((state: RootState)=> state);

    useEffect(() => {
        onAuthStateChanged(auth,  async (user)=> {
            if(user) {
                if(!state.user.data || !state.chats.data) {
                    await dispatch(getUser());
                    dispatch(loadChats());
                }
            }
            else goHome();
        })
    }, [goHome]);

    return state.user.data && state.chats.data ? <div>{children}</div> : <></>;
}

export default AuthWrapper;