import { AdditionalInformationType, CategoryAccount } from "../../../shared";
import { useFormAccount } from "../hooks/useFormAccount.hook";

function CreateAccountForm() {
  const { fields, append, remove, register, handleSubmit, onSubmit, errors } =
    useFormAccount();
  return (
    <form className="space-y-6 text-black" onSubmit={handleSubmit(onSubmit)}>
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

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2 mt-2 p-0.5">
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

          <input
            {...register(`additionalInformation.${index}.value`)}
            placeholder="Value"
            className="border p-0.5 w-fit rounded-md border-gray-500 shadow-sm text-gray-900"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 focus:ring-red-500 "
          >
            Delete
          </button>
        </div>
      ))}
      <div className="flex items-center justify-center ">
        <button
          type="button"
          onClick={() => append({ type: "", value: "" })}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-blue-500 "
        >
          Add Information
        </button>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default CreateAccountForm;
