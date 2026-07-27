import { useAuthenticatedStore } from "../../auth/store/Authenticated.store";
import { useState } from "react";
import { decryptAdditionalInformation } from "../services/Encriptyng.service";
import type { AdditionalInformation } from "../../../Shared";

export default function TargetAdditionalInformation({
  data,
}: {
  data: AdditionalInformation;
}) {
  const { privateKey } = useAuthenticatedStore();

  const [decryptedValue, setDecryptedValue] = useState<string | null>(null);

  function handleDecrypt(data: AdditionalInformation) {
    if (decryptedValue !== null) {
      setDecryptedValue(null);
      return;
    }
    const res = decryptAdditionalInformation(data, privateKey);
    setDecryptedValue(res);
  }

  return (
    <div className="flex flex-col gap-2 bg-neutral-300 text-black p-3 rounded-lg">
      <div className="flex gap-2">
        <p>Key: {data.type}</p>
        <p>Value: {
          decryptedValue || "******"
        }</p>
      </div>
      <button
        onClick={() => {
          handleDecrypt(data);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        DECRIPT
      </button>
    </div>
  );
}
