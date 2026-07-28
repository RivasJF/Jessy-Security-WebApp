import { NavLink } from "react-router";
import { DashboardAccount, LogoutButton } from "../../features";
import { HomeButton } from "../../shared";

export default function Dashboard() {
  
  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen">
      <HomeButton />
      <header className="flex flex-col w-4/5 pt-6">
        <h1 className="text-4xl font-bold mb-4 text-green-50 text-center">
          Accounts
        </h1>
        <hr className="border-t border-gray-300 " />
      </header>
      {/* panel grid */}
      <DashboardAccount />

      <div className="fixed top-4 right-4">
        <LogoutButton />
      </div>

      <NavLink
        to="/create-account"
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
      >
        Create Account
      </NavLink>
    </div>
  );
}
