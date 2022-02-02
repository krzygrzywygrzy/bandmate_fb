import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Route, Router as WouterRouter } from "wouter";
import Navbar from "../components/layout/navbar/Navbar";
import store from "../store/store";
import Join from "./auth/Join";
import Welcome from "./welcome/Welcome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../firebase";
import Home from "./home/Home";

const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(getAuth(firebase), (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <WouterRouter>
          <Route path="/">{loggedIn ? <Home /> : <Welcome />}</Route>
          <Route path="/join">
            <Join />
          </Route>
        </WouterRouter>
      </Provider>
    </div>
  );
};

export default Router;
