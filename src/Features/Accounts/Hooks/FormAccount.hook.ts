import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import type { CategoryAccount } from "../../../Shared/Types/Domain/account/CategoryAccount.type";
import { useAuthenticatedStore } from "../../../Store/Authenticated.store";
import type { AdditionalInformation, RegisterAccount } from "../../../Shared/Types/Domain/account/RegisterAccount.type";
import type { AdditionalInformationType } from "../../../Shared/Types/Domain/account/AditionaInformation.type";
import { encryptAdditionalInformation } from "../../../Shared/Utils/EncriptedAdditionalInformation";

type Inputs = {
  title: string;
  username: string;
  description: string;
  category: CategoryAccount;
  additionalInformation: AdditionalInformationInput[];
};

export type AdditionalInformationInput = {
  type: string;
  value: string;
};


export const useFormAccount = () => {
    const {privateKey} = useAuthenticatedStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInformation",
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    //encritar datos

    const additionalInformation: AdditionalInformation[] = encryptAdditionalInformation(data.additionalInformation, privateKey);
    const payload: RegisterAccount = {
      title: data.title,
      username: data.username,
      description: data.description,
      category: data.category,
      additionalInformation: additionalInformation,
    };
  
    //send request
    

    console.log(payload, privateKey);
  }

  return {
    register,
    fields,
    append,
    remove,
    handleSubmit,
    onSubmit,
    errors,
  }
};
