import { Outlet } from "react-router";


export default function ProtectedRouter() {
    const isAuthenticated = false; // Replace with your authentication logic

    if (!isAuthenticated) {
        return <h1>Access Denied</h1>;
    }

    return <Outlet />;
}