import Message from "./Message";

type Match = {
  lastMessage?: Message,
  id: string;
  users: string[],
}
export default Match;