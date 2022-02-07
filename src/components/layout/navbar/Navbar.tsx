import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import LoginPopup from "../../popup/LoginPopup";
import Popup from "../../popup/Popup";
import "./navbar.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

const Navbar: React.FC = () => {
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
            <div className="register">Register</div>
          </div>
        ) : (
          <div>log out</div>
        )}
      </div>
      <Popup trigger={login}>
        <LoginPopup close={() => setLogin(false)} />
      </Popup>
    </div>
  );
};

export default Navbar;
