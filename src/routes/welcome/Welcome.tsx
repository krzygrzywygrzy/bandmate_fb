import React, {useEffect, useState} from "react";
import "./welcome.css";
import {useLocation} from "wouter";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";

const Welcome: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user)=> {
      if(user) setLoggedIn(true);
      else setLoggedIn(false);
    });
  }, []);


  const [, setLocation] = useLocation();
  return (
      <div className="welcome container">
        <header>
          <span className="title">Welcome to BandMate</span>
          <br/>
          <span className="sub-title">best place to meet fellow musicians</span>
        </header>
        <section className="join">
          <button className="button" onClick={() => setLocation(!loggedIn ? "/join": "/swipe")}>
            {loggedIn ? "Go to dashboard": "Join"}
          </button>
        </section>
      </div>
  );
};

export default Welcome;
