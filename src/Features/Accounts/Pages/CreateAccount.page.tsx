import { useFormAccount } from "../Hooks/FormAccount.hook";
import { CategoryAccount } from "../../../Shared/Types/Domain/account/CategoryAccount.type";
import { AdditionalInformationType } from "../../../Shared/Types/Domain/account/AditionaInformation.type";

export default function FormAccount() {
  const { fields, append, remove, register, handleSubmit, onSubmit, errors } =
    useFormAccount();

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      FormAccount
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form
          className="space-y-6 text-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="title">Title</label>
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
            <input
              {...register("title", { required: true })}
              type="text"
              id="title"
              className="mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="mt-1 p-0.5 block w-full rounded-md border-gray-500 shadow-sm text-gray-900"
            />
          </div>

          <div>
          <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select id="category" {...register("category", { required: true })}>
              {Object.values(CategoryAccount).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Information Fields */}

          {fields.map((field, index) => (
            <div key={field.id}>
              <select {...register(`additionalInformation.${index}.type`)}>
                {Object.values(AdditionalInformationType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <input
                {...register(`additionalInformation.${index}.value`)}
                placeholder="Value"
              />

              <button type="button" onClick={() => remove(index)}>
                Eliminar
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ type: "", value: "" })}
          >
            Agregar información adicional
          </button>


          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
