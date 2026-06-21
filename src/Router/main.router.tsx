import { createBrowserRouter } from "react-router";
import App from "../App";
import Window from "../Features/Notices/Pages/Window.page";
import Login from "../Features/Auth/Pages/Login.page";
import Register from "../Features/Auth/Pages/Register.page";
import Test from "../Features/Auth/Pages/Test.page";


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
        path: "/window",
        Component: Window,
    },
    {
        path: "/test",
        Component: Test,
    },
    {
        path: "*",
        Component: () => <h1>404 Not Found</h1>,
    }
]);

export default ROUTER;
