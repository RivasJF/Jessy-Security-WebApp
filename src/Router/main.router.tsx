import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../Features/Auth/Pages/Login.page";
import Register from "../Features/Auth/Pages/Register.page";
import Test from "../Features/Auth/Pages/Test.page";
import ProtectedRouter from "./protected.router";
import Dashboard from "../Features/Accounts/Pages/Dashboard.page";
import FormAccount from "../Features/Accounts/Pages/CreateAccount.page";
import InfoAccount from "../Features/Accounts/Pages/InfoAccount.page";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: App,
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
        Component: InfoAccount,
      }
    ],
  },
        {
        path: "/test",
        Component: Test,
      },

  {
    path: "*",
    Component: () => <h1>404 Not Found</h1>,
  },
]);

export default ROUTER;
