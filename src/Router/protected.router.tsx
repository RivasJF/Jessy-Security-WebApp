import { Navigate, Outlet } from "react-router";
import { useAuthenticatedStore } from "../Store/Authenticated.store";


export default function ProtectedRouter() {
    const { isAuthenticated } = useAuthenticatedStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}