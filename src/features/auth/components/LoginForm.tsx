import { useState } from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import type { LoginFormData } from "../types/api.types";

export default function LoginForm() {
  const {  error, isLoading, loginFn } =
    useLoginForm();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginFn(formData);
  };

  return (
    <>
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
    </>
  );
}
