import React from "react";
import { Route, Router as WouterRouter } from "wouter";
import Navbar from "../components/layout/navbar/Navbar";
import Join from "./auth/Join";
import Welcome from "./welcome/Welcome";
import Home from "./home/Home";
import Account from "./account/Account";
import Messages from "./messages/Messages";
import AuthWrapper from "../components/AuthWrapper";

const Router: React.FC = () => {
  return (
    <div>
      <Navbar />
      <WouterRouter>
        <Route path="/">
          <Welcome />
        </Route>
        <Route path="/swipe">
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/account">
          <AuthWrapper>
            <Account />
          </AuthWrapper>
        </Route>
        <Route path="/messages">
          <AuthWrapper>
            <Messages />
          </AuthWrapper>
        </Route>
        <Route path="/messages/:id">
          {(params) => <Messages id={params.id} />}
        </Route>
      </WouterRouter>
    </div>
  );
};

export default Router;
