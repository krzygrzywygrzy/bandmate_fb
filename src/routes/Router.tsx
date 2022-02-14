import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Router as WouterRouter} from "wouter";
import Navbar from "../components/layout/navbar/Navbar";
import {RootState} from "../store/store";
import Join from "./auth/Join";
import Welcome from "./welcome/Welcome";
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import Home from "./home/Home";
import Account from "./account/Account";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {getUser} from "../store/thunk/userThunks";
import {loadChats} from "../store/thunk/chatThunks";
import Messages from "./messages/Messages";

const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const storedUser = useSelector((state: RootState) => state.user);
  const storedChat = useSelector((state: RootState) => state.chats)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        if(!storedUser.data) dispatch(getUser());
        //if(!storedChat.data) dispatch(loadChats());
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const chatsUpdates = async (): Promise<void> => {
    if (storedUser.data && storedChat.data) {
      const q = query(
          collection(firestore, "matches"),
          where("id", "in", storedUser.data.matches),);
      // const subscription = onSnapshot(
      //     q, (querySnapshot) => {
      //
      //     });
    }
  }

  return (
      <div>
        <Navbar/>
        <WouterRouter>
          <Route path="/">{loggedIn ? <Home/> : <Welcome/>}</Route>
          <Route path="/join">
            <Join/>
          </Route>
          <Route path="/account">
            <Account/>
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
        </WouterRouter>
      </div>
  );
};

export default Router;
