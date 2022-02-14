import User from "./User";
import Message from "./Message";

type Chat = {
  user: User;
  messages: Message[];
  id: string;
};

export default Chat;