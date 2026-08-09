import { useForm } from "react-hook-form";
import type { AccountEditInput } from "../types/account.types";
import { CategoryAccount } from "../types/CategoryAccount.type";
import { useParams } from "react-router";
import { useGetInfoAccount } from "../hooks/InforAccount.hook";
import TargetEditAdditionalInformation from "./TargetEditAdditionalInformation";


export default function ComponentName() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetInfoAccount(id || "");

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountEditInput>({
    defaultValues: {
      title: data?.title ?? "",
      username: data?.username,
      description: data?.description,
      category: data?.category as CategoryAccount,
      additionalInformation: data?.additionalInformation.map((add) => {
        return {
          id: add.id,
          type: add.type,
          value: add.value,
          key: add.key,
        }
      }) ?? [],
    },
  });

  const onSubmit = (dataSubmit: AccountEditInput) => {
    console.log(data)
      console.log("Payload to submit:", dataSubmit);
  };

  return (
    <form className="space-y-6 text-black bg-amber-50 p-5 rounded-md shadow-md" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
        <input
          {...register("title", { required: true })}
          type="text"
          id="title"
          className="border mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: true })}
          className="border mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description")}
          className="border mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
        ></textarea>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="border mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
          {...register("category", { required: true })}
        >
          {Object.values(CategoryAccount).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Information Fields */}

      {data?.additionalInformation && <TargetEditAdditionalInformation
        control={control}
        register={register}
        setValue={setValue}
      />
      }

      <div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Edit Account
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error?.response?.data.message}</div>}
    </form>
  );
}
