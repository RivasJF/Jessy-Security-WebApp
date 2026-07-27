import { Navigate, NavLink } from "react-router";
import { RegisterForm, useAuthenticatedStore } from "../../features";
import { HomeButton } from "../../shared";

export default function Register() {
  const { isAuthenticated } = useAuthenticatedStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <HomeButton />
      <div className="w-full max-w-md rounded-lg bg-zinc-50 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-black">
          Register
        </h2>
        <RegisterForm />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <NavLink
              replace
              to="/login"
              className="text-green-500 hover:underline"
            >
              Login here
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
