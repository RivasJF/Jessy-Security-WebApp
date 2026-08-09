import type { UseFormRegister } from "react-hook-form";
import type { AccountEditInput, AdditionalInformationEditInput } from "../types/account.types";
import { useAuthenticatedStore } from "../../auth";
import { useState } from "react";
import type { AdditionalInformationResponse } from "../types/AccountListResponse.type";
import { decryptAdditionalInformation } from "../services/Encriptyng.service";



export default function InputDecript(
  { index, data, register, setValue }
    : {
      index: number;
      data: AdditionalInformationResponse;
      register: UseFormRegister<AccountEditInput>;
      setValue: (name: `additionalInformation.${number}.value`, value: string) => void;
    }) {

      const { privateKey } = useAuthenticatedStore();

  const [decryptedValue, setDecryptedValue] = useState<string | null>(null);
  const [changed, setChanged] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);


  function handleDecrypt(data: AdditionalInformationEditInput) {
    console.log("Decrypting data:", data);
    if (data.key != "" && privateKey != null && !changed) {
      const res = decryptAdditionalInformation(data, privateKey);
      setDecryptedValue(res);
      setValue(`additionalInformation.${index}.value`, res);
      setChanged(true);
      return;
    }
      }


  return (
    <input
      {...register(`additionalInformation.${index}.value`)}
      onFocus={() => {
        handleDecrypt(data);
        setIsFocused(true);
      }}
      onBlur={() => setIsFocused(false)}
      onChange={(e) => {
        setDecryptedValue(e.target.value);
        register(`additionalInformation.${index}.value`).onChange(e);
      }}
      value={isFocused ? (decryptedValue ?? "") : "******"}
      placeholder="Value"
      className="border p-0.5 w-fit rounded-md border-gray-500 shadow-sm text-gray-900 cursor-pointer"
    />
  );
}
