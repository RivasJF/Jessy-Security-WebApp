import { NavLink } from "react-router";
import type { Account } from "../../../Shared/Types/Domain/account/Account.type";
import { useAuthenticatedStore } from "../../../Store/Authenticated.store";
import TargetAccount from "../Components/TargetAccount";

export default function Dashboard() {

  const { setIsAuthenticated } = useAuthenticatedStore();

  const account: Account = {
    id: '1',
    title: 'My Account',
    username: 'johndoe',
    description: 'This is my account description.',
    category: 'Personal',
  };
  const accountArray: Account[] = [
    {
      id: '1',
      title: 'My Account',
      username: 'johndoe',
      description: 'This is my account description.',
      category: 'Personal',
    },
    {
      id: '2',
      title: 'Work Account',
      username: 'janedoe',
      description: 'This is my work account description.',
      category: 'Work',
    },
    {
      id: '3',
      title: 'Social Media Account',
      username: 'socialuser',
      description: 'This is my social media account description.',
      category: 'Social Media',
    }
  ];
  function handleLogout() {
    setIsAuthenticated(false);
  }

  return (
    <div className="flex flex-col items-center  min-h-screen py-2">
      <header className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 border-b border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      {/* panel grid */}
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {accountArray.map((acc) => (
          <TargetAccount key={acc.id} account={acc} />
        ))}
        </div>
      </div>
      <NavLink
        to="/create-account"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create Account
      </NavLink>
    </div>
  )
}
