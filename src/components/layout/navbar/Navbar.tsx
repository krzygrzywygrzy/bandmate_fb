import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import LoginPopup from "../../popup/LoginPopup";
import Popup from "../../popup/Popup";
import "./navbar.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { HiUserGroup, HiUserCircle, HiPaperAirplane } from "react-icons/hi";
import { useLocation } from "wouter";

const Navbar: React.FC = () => {
  const [, setLocation] = useLocation();

  const [login, setLogin] = useState<boolean>(false);
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setAuthState(true);
      else setAuthState(false);
    });
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-container container">
        <div className="navbar-container-title">
          <Link href="/">BandMate</Link>
        </div>

        {!authState ? (
          <div className="auth">
            <div onClick={() => setLogin(true)}>Login</div>
            <div className="register">
              <Link to="/join" className="register">
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div className="auth">
            <div className="auth-icon" onClick={() => setLocation("/swipe")}>
              <HiUserGroup size={24} />
            </div>
            <div className="auth-icon" onClick={() => setLocation("/messages")}>
              <HiPaperAirplane size={24} />
            </div>
            <div className="auth-icon" onClick={() => setLocation("/account")}>
              <HiUserCircle size={24} />
            </div>
          </div>
        )}
      </div>
      <Popup trigger={login}>
        <LoginPopup close={() => setLogin(false)} />
      </Popup>
    </div>
  );
};

export default Navbar;
