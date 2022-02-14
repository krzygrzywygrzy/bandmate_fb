import User from "./User";
import Message from "./Message";

type Chat = {
  user: User;
  messages: Message[];
};

export default Chat;