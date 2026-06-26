import { Navigate, NavLink } from "react-router";
import { useAuthenticatedStore } from "../../../Store/Authenticated.store";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {
  const { formData, handleChange, handleSubmit , error, isLoading } = useLoginForm();
  const { isAuthenticated } = useAuthenticatedStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace/>;
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-black">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </form>
        <span className="text-red-500 text-sm mt-2">{error}</span>
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
