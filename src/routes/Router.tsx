import React from "react";
import { Provider } from "react-redux";
import { Route, Router as WouterRouter } from "wouter";
import Navbar from "../components/layout/navbar/Navbar";
import store from "../store/store";
import Welcome from "./welcome/Welcome";

const Router: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <WouterRouter>
          <Route path="/">
            <Welcome />
          </Route>
        </WouterRouter>
      </Provider>
    </div>
  );
};

export default Router;
