import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import "./scss/messages.css";
import {FiSend} from "react-icons/fi";
import {sendMessage as sendThunk} from "../../store/thunk/messagesThunks";
import MessageBox from "./MessageBox";
import {FiUserX} from "react-icons/fi";
import {unmatch} from "../../store/thunk/matchesThunks";
import Popup from "../../components/popup/Popup";

type Props = {
  id: string;
}

const Chat: React.FC<Props> = ({id}) => {
  const dispatch = useDispatch();

  const chat = useSelector(
      (state: RootState) =>
          state.chats.data!.filter((chat) => chat.id === id)[0]);

  const [phrase, setPhrase] = useState<string>("");
  const [unmatchPopup, setUnmatchPopup] = useState<boolean>(false);

  // send when enter is clicked
  useEffect(() => {
    const send = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phrase.length > 2) {
        sendMessage();
      }
    };
    document.addEventListener("keypress", send);
    return () => {
      document.removeEventListener("keypress", send);
    };
  }, []);

  const sendMessage = async () => {
    await dispatch(sendThunk(id, phrase));
    setPhrase("");
  }

  return <div className="chat">
    <header>
      <div>{chat.user.name} {chat.user.surname}</div>
      <div className="unmatch" onClick={()=> setUnmatchPopup(true)}><span>unmatch</span><FiUserX size={20}/></div>
    </header>
    <section className="chat-messages">
      {chat && <MessageBox id={id}/>}
    </section>
    <section className="chat-input">
      <input placeholder="type something..."
             value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
      <div onClick={() => {
        if (phrase.length > 2) sendMessage();
      }}><FiSend size={24}/></div>
    </section>
    <Popup trigger={unmatchPopup}>
      <div className="unmatch-popup">
        <div className="unmatch-popup-message">Are you sure?</div>
        <div className="unmatch-popup-buttons">
          <div>No</div>
          <div className="yes-button">Yes</div>
        </div>
      </div>
    </Popup>
  </div>;
}

export default Chat;