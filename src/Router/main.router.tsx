import { createBrowserRouter } from "react-router";
import App from "../App";
import Panel from "../Features/Notices/Pages/Panel.page";


const ROUTER = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/panel",
        Component: Panel,
    }
]);

export default ROUTER;
