import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Dashboard from "../Dashboard/Dashoboard";

import routes from "../../routes";
import { getToken } from "../../utils/handleLocalStorage";

const Layout = ({ history }) => {
  const isAuthenticated = getToken();

  return (
    <>
      <Switch>
        {routes.map((route) => {
          const data = {
            ...route,
          };

          return <Route key={route.path} {...data} />;
        })}
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </>
  );
};
export default Layout;
