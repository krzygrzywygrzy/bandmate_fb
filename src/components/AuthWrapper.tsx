import React, { useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { auth, firestore } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/thunk/userThunks";
import { loadChats, updateChatList } from "../store/thunk/chatThunks";
import { onAuthStateChanged } from "firebase/auth";
import { RootState } from "../store/store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Match from "../models/Match";

const AuthWrapper: React.FC = ({ children }) => {
  const [, setLocation] = useLocation();
  const goHome = useCallback(() => setLocation("/"), [setLocation]);

  const dispatch = useDispatch();
  const you = useSelector((state: RootState) => state.user);
  const chats = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    let unsubscribe: any;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!you.data || !chats.data) {
          const matches: any = await dispatch(getUser());
          await dispatch(loadChats());

          const q = query(
            collection(firestore, "matches"),
            where("id", "in", matches)
          );

          //TODO: check out why changes monitoring does not work
          unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "modified") {
                dispatch(updateChatList(change.doc.data() as Match));
              }
            });
          });
        }
      } else goHome();
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line
  }, [goHome, dispatch]);

  return you.data && chats.data ? <div>{children}</div> : <></>;
};

export default AuthWrapper;
