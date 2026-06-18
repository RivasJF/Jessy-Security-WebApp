import { createBrowserRouter } from "react-router";
import App from "../App";
import Window from "../Features/Notices/Pages/Window.page";
import Login from "../Features/Auth/Pages/Login.page";
import Register from "../Features/Auth/Pages/Register.page";


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
    }
]);

export default ROUTER;
