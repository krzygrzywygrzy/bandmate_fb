import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getMessages, pushNewMessage} from "../../store/thunk/messagesThunks";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import Message from "../../models/Message";

type Props = {
  id: string;
}

const MessageBox: React.FC<Props> = ({id}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState)=> state.messages);

  //get messages
  useEffect(() => {
    dispatch(getMessages(id));
  }, [id, dispatch]);

  useEffect(() => {
    if(messages.data) {
      const q = query(collection(firestore, "messages"), where("chat_id", "==", id));
      onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach((change) => {
          if(change.type === "added") {
            dispatch(pushNewMessage(change.doc.data() as Message));
          }
        })
      })
    }
  }, [messages.data, dispatch]);



  if(messages.loading) return <div>Loading...</div>
  if(messages.error) return  <div>Error while loading messages</div>;

  return messages.data ? <div>
    {messages.data.length > 0 ? <div>
      messages
    </div>: <div>There are no messages yet!</div>}
  </div> : <></>;
}

export default MessageBox;