import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUser } from "../../store/thunk/userThunks";

const Account: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.data) {
      dispatch(getUser());
    }
  }, []);

  if (user.loading) return <div>Loading...</div>;
  if (user.error) return <div>Error: {user.error}</div>;

  return user.data ? <div>Account</div> : <></>;
};

export default Account;
