import { useGetInfoAccount } from "../hooks/InforAccount.hook";
import { useNavigate, useParams } from "react-router";
import TargetAdditionalInformation from "./TargetAdditionalInformation";

export default function InfoAccount() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetInfoAccount(id || "");
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          >
            return
          </button>
          <div className="flex flex-col gap-4 bg-mist-600 p-3 rounded-lg">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <p className="text-lg">Username: {data.username}</p>
            <p className="text-lg">Description: {data.description}</p>
            {data.additionalInformation.map((info) => (
              <TargetAdditionalInformation key={info.id} data={info} />
            ))}
            <button
              onClick={() => navigate(`/edit-account/${id}`, { state: { account: data } })}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </>
  );
}
