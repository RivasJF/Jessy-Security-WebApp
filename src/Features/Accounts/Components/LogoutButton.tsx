import { useAuthenticatedStore } from "../../Auth/Store/Authenticated.store";
import { ImEnter } from "react-icons/im";

export default function LogoutButton() {
  const { logout } = useAuthenticatedStore();
  function handleLogout() {
    logout();
  }
  return (
    <button
      className="bg-indigo-50 text-black px-4 py-2 rounded hover:bg-black hover:text-amber-50 flex items-center  gap-2"
      onClick={handleLogout}
    >
      <ImEnter
        className="text-3xl"
      />
      <p
      className="text-lg"
      >Logout</p>
    </button>
  );
}
