import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./bootstrap.min.css";
import "./App.css";

import { loadUser } from "./actions/auth";
import { LOGOUT } from "./actions/types";
import setAuthToken from "./utils/setAuthToken";

import Routes from "./components/routes/Routes";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/layout/Layout";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Layout>
            <main>
              <Route component={Routes} />
            </main>
          </Layout>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
