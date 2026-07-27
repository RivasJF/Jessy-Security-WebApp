import { Navigate, NavLink } from "react-router";
import { LoginForm, useAuthenticatedStore } from "../../features";
import { HomeButton } from "../../shared";

export default function Login() {

  const { isAuthenticated } = useAuthenticatedStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace/>;
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <HomeButton />
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-black">
          Login
        </h2>
        <LoginForm /> 
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <NavLink
              replace
              to="/register"
              className="text-green-500 hover:underline"
            >
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
