import { useNavigate } from "react-router";
import { GrTerminal } from "react-icons/gr"

export default function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      className="absolute top-4 left-4 bg-indigo-50 text-black px-2 py-2 rounded hover:bg-black hover:text-amber-50 hover:border hover:border-zinc-50 flex items-center flex-col gap-2"
      onClick={() => navigate("/")}
    >
      <GrTerminal
        className="text-3xl"
      />
    </button>
  );
}
