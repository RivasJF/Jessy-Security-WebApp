import { createBrowserRouter } from "react-router";
import ProtectedRouter from "./protected.router";
import { Login, Register } from "../pages/auth";
import { Dashboard, FormAccount, InfoAccountPage } from "../pages/Dashboard";
import Home from "../pages/Home/Home";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    element: <ProtectedRouter />,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/create-account",
        Component: FormAccount,
      },
      {
        path: "/account/:id",
        Component: InfoAccountPage,
      }
    ],
  },
  {
    path: "*",
    Component: () => <h1>404 Not Found</h1>,
  },
]);

export default ROUTER;
