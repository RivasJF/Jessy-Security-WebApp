import { Outlet } from "react-router";
import { useAuthenticatedStore } from "../Store/Authenticated.store";


export default function ProtectedRouter() {
    const { isAuthenticated, setIsAuthenticated } = useAuthenticatedStore();

    if (!isAuthenticated) {
        return <><h1>Access Denied</h1><button onClick={() => setIsAuthenticated(true)}>Login</button></>
        ;
    }

    return <Outlet />;
}