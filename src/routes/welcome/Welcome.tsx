import React from "react";
import "./welcome.css";
import { useLocation } from "wouter";

const Welcome: React.FC = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="welcome">
      <header>
        <span className="title">Welcome to bandmate</span>
        <br />
        <span className="sub-title">best place to meet fellow musicians</span>
      </header>
      <section>
        <button className="button" onClick={() => setLocation("/join")}>
          Join
        </button>
      </section>
    </div>
  );
};

export default Welcome;
