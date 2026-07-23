import { useNavigate } from "react-router";
import { DiOpensource } from "react-icons/di";
import type { AccountListResponse } from "../../../Shared/Types/Domain/account/AccountListResponse.type";

export default function TargetAccount({ account }: { account: AccountListResponse }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/${account.id}`)}
      className="flex items-center justify-start bg-gray-500 text-xl w-sm p-3 gap-3 cursor-pointer"
    >
      <div>
        <DiOpensource className="text-7xl " />
      </div>
      <div>
        <h3 className="text-md font-bold">{account.title}</h3>
        <h4 className="text-lg">{account.username}</h4>
        <p className="text-sm">{account.description}</p>
      </div>
    </div>
  );
}
