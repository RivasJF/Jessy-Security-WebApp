import { useAuthenticatedStore } from "../../../Store/Authenticated.store";

export default function LogoutButton() {
  const { logout } = useAuthenticatedStore();
  function handleLogout() {
    logout();
  }
  return (
    <button
      className="bg-indigo-50 text-black px-4 py-2 rounded hover:bg-sky-100"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
