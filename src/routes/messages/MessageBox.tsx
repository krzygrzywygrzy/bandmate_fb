import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getMessages} from "../../store/thunk/messagesThunks";

type Props = {
  id: string;
}

const MessageBox: React.FC<Props> = ({id}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState)=> state.messages);
  useEffect(() => {
    dispatch(getMessages(id));
  }, []);

  if(messages.loading) return <div>Loading...</div>
  if(messages.error) return  <div>Error while loading messages</div>;

  return messages.data ? <div>
    {messages.data.length > 0 ? <div>
      messages
    </div>: <div>There are no messages yet!</div>}
  </div> : <></>;
}

export default MessageBox;