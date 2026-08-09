import { useNavigate } from "react-router";
import { useDeleteAccount } from "../hooks/useDelteAccount.hook";



export default function DeleteButtonAccount({ id }: { id: string }) {
  const { deleteAccountFn, isError } = useDeleteAccount();
  const navigate = useNavigate();

  function handleDelete() {
    console.log("Delete account with id:", id);
    console.log(deleteAccountFn(id));
    if (!isError) {
      navigate("/dashboard", { replace: true });
      return;
    }
    alert("Error Delete")
  }

  return (
    <button
      onClick={() => handleDelete()}
    >
      Delete
    </button>
  );
}
