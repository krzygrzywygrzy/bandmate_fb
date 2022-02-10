type User = {
  name: string;
  surname: string;
  email: string;
  spotify?: string;
  description: string;
  photoUrls: string[];
  genres: string[];
  instruments: string[];
  id: string;
};
export default User;

export type UserPrimary = {
  name: string;
  surname: string;
  description: string;
};
