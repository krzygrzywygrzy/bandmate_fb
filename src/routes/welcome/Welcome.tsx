import React from "react";
import "./welcome.css";

const Welcome: React.FC = () => {
  return (
    <div className="welcome">
      <header>
        <span>Welcome to bandmate</span>
        <br />
        <span>best place to meet fellow musicians</span>
      </header>
      <section>
        <button className="button">Join</button>
      </section>
    </div>
  );
};

export default Welcome;
