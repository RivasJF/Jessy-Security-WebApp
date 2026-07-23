import { NavLink } from "react-router";
import TargetAccount from "../Components/TargetAccount";
import LogoutButton from "../Components/LogoutButton";
import { useGetListAccounts } from "../Hooks/ListAccounts.hook";

export default function Dashboard() {
  const {
    data: accountArray,
    isLoading,
    error,
    isSuccess,
  } = useGetListAccounts();
  
  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen">
      <header className="flex flex-col w-4/5 pt-6">
        <h1 className="text-4xl font-bold mb-4 text-green-50 text-center">
          Accounts
        </h1>
        <hr className="border-t border-gray-300 " />
      </header>
      {/* panel grid */}
      <section className="w-full max-w-max px-4 py-6">
        {isLoading && <p>Loading accounts...</p>}
        {error && <p>Error loading accounts</p>}
        {isSuccess && (
          <>
            {accountArray.length === 0 ? (
              <p className="text-center text-gray-400">No accounts found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-8 md:grid-cols-3 gap-5">
                {accountArray.map((acc) => (
                  <TargetAccount key={acc.id} account={acc} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <div className="fixed top-4 left-4">
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
