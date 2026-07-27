import { Navigate, Outlet } from "react-router";
import { useAuthenticatedStore } from "../Features";


export default function ProtectedRouter() {
    const { isAuthenticated } = useAuthenticatedStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}