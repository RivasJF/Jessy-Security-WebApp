import { createBrowserRouter } from "react-router";
import App from "../App";
import Window from "../Features/Notices/Pages/Window.page";


const ROUTER = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/window",
        Component: Window,
    }
]);

export default ROUTER;
