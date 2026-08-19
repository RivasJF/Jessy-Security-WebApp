import {
  useFieldArray,
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import type { AccountEditInput } from "../types/account.types";
import { AdditionalInformationType } from "../types/AditionaInformation.type";
import InputDecript from "./InputDecript";

export default function TargetEditAdditionalInformation({
  control,
  register,
  setValue,
}: {
  control: Control<AccountEditInput, any, AccountEditInput>;
  register: UseFormRegister<AccountEditInput>;
  setValue: UseFormSetValue<AccountEditInput>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInformation",
  });

  function deleted(index: number) {
    if (fields[index].id) {
      setValue(`additionalInformation.${index}.deleted`, true);
      return;
    }
    remove(index);
  }

  return (
    <>
      {fields
        // .filter((field) => field.deleted === null || field.deleted === undefined)
        .map((field, index) => (
          <div className="flex flex-col gap-2 bg-neutral-300 text-black p-3 rounded-lg">
            <div className="flex gap-2">
              <select
                {...register(`additionalInformation.${index}.type`)}
                className="border rounded-md border-gray-500 shadow-sm text-gray-900"
              >
                {Object.values(AdditionalInformationType).map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="border p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
                  >
                    {type}
                  </option>
                ))}
              </select>

              <InputDecript
                index={index}
                data={{
                  id: field.id,
                  type: field.type as AdditionalInformationType,
                  value: field.value,
                  key: field.key,
                }}
                register={register}
                setValue={setValue}
              />
            </div>

            <button
              type="button"
              onClick={() => deleted(index)}
              className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 focus:ring-red-500 "
            >
              Delete
            </button>
          </div>
        ))}
      <div className="flex items-center justify-center ">
        <button
          type="button"
          onClick={() =>
            append({
              type: null,
              value: "",
              key: "",
            })
          }
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-blue-500 "
        >
          Add Information
        </button>
      </div>
    </>
  );
}
