import User from "./User";
import Message from "./Message";

type Chat = {
  user: User;
  lastMessage?: Message;
  id: string;
};

export default Chat;