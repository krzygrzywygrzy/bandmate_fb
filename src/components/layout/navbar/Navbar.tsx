import React from "react";
import { Link } from "wouter";
import "./navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <Link href="/">BandMate</Link>
      </div>
      <div className="auth">Login</div>
    </div>
  );
};

export default Navbar;
