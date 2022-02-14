import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getUser, logOut} from "../../store/thunk/userThunks";
import "./scss/account.css";
import {HiLogout} from "react-icons/hi";
import {useLocation} from "wouter";
import AccountPrimaryData from "./AccountPrimaryData";
import AuthWrapper from "../../components/AuthWrapper";

const Account: React.FC = () => {
  const [, setLocation] = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.data) {
      dispatch(getUser());
    }
  }, [user.data, dispatch]);

  if (user.loading) return <div className="container account">Loading...</div>;
  if (user.error)
    return <div className="container account">Error: {user.error.message}</div>;

  return user.data ? (
      <AuthWrapper>
        <div className="container account">
          <header>
            <span>Account</span>
            <span
                className="log-out"
                onClick={() => {
                  dispatch(logOut());
                  setLocation("/");
                }}
            >
              <span className="log-out-icon">
                <HiLogout/>
              </span>{" "}
              <span>Log out</span>
            </span>
          </header>
          <AccountPrimaryData/>

        </div>
      </AuthWrapper>
  ) : (
      <></>
  );
};

export default Account;
