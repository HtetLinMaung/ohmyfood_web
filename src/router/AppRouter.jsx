import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppContainer from "../containers/AppContainer";
import routes from "./router";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/admin/"
          render={(props) => <AppContainer {...props} routes={routes} />}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
