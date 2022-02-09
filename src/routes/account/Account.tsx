import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUser, logOut } from "../../store/thunk/userThunks";
import "./scss/account.css";
import { HiLogout } from "react-icons/hi";
import { useLocation } from "wouter";

const Account: React.FC = () => {
  const [, setLocation] = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.data) {
      dispatch(getUser());
    }
  }, []);

  if (user.loading) return <div className="container account">Loading...</div>;
  if (user.error)
    return <div className="container account">Error: {user.error}</div>;

  return user.data ? (
    <div className="container account">
      <header>
        <span>
          {user.data.name} {user.data.surname}
        </span>
        <span
          className="log-out"
          onClick={() => {
            dispatch(logOut());
            setLocation("/");
          }}
        >
          <span className="log-out-icon">
            <HiLogout />
          </span>{" "}
          <span>Log out</span>
        </span>
      </header>
    </div>
  ) : (
    <></>
  );
};

export default Account;
