import type { AdditionalInformationType } from "./AditionaInformation.type";
import type { CategoryAccount } from "./CategoryAccount.type";

export type AccountCreateInput = {
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

export type AccountEditInput = {
  title: string;
  username: string;
  description: string;
  category: CategoryAccount;
  additionalInformation: AdditionalInformationInput[];
};

export type AdditionalInformationEditInput = {
  type: string;
  value: string;
};

export type UpdateAccountRequest = {
    id: string;
    title?: string | null;
    username?: string | null;
    description?: string | null;
    category?: CategoryAccount | null;
    additionalInformation?: UpdateAdditionalInformationRequest[] | null;
}

export type UpdateAdditionalInformationRequest = {
  id?: string;
  deleted?: true | null;
  type?: AdditionalInformationType | null;
  value?: string | null;
  key?: string | null;
};
