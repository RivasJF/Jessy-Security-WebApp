import type { CategoryAccount } from "../../../Shared/Types/Domain/account/CategoryAccount.type";

export type Inputs = {
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
