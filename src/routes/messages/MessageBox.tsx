import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { pushNewMessage } from "../../store/thunk/messagesThunks";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import Message from "../../models/Message";
import MessageCard from "../../components/cards/MessageCard/MessageCard";
import "./scss/messages.css";

type Props = {
  id: string;
};

const MessageBox: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages);

  //get messages
  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      where("chat_id", "==", id),
      orderBy("sent")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(pushNewMessage(change.doc.data() as Message));
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [id, dispatch]);

  if (messages.loading) return <div>Loading...</div>;
  if (messages.error) return <div>Error while loading messages</div>;

  return messages.data ? (
    <div className="messages-box">
      {messages.data.length > 0 ? (
        <div>
          {messages.data.map((message, index) => (
            <div key={index}>
              <MessageCard message={message} />
            </div>
          ))}
        </div>
      ) : (
        <div>There are no messages yet!</div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default MessageBox;
