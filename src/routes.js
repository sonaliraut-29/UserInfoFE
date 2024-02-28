import Register from "./components/register/Register";
import Login from "./components/login/Login";

import * as routes from "./components/constant";
import Dashboard from "./components/Dashboard/Dashoboard";

const routesList = [
  {
    path: routes.ROOT_ROUTE,
    component: Login,
    exact: true,
  },
  {
    path: routes.REGISTER_ROUTE,
    component: Register,
    exact: true,
  },
  // {
  //   path: routes.USER_HOME_ROUTE,
  //   component: Dashboard,
  //   exact: true,
  // },
];

export default routesList;
