import type { AdditionalInformationType } from "../AditionaInformation.type";
import type { CategoryAccount } from "../CategoryAccount.type";

export type RegisterAccount = {
    title: string;
    username: string;
    description: string;
    category: CategoryAccount;
    additionalInformation: AdditionalInformation[];
}

type AdditionalInformation = {
    type: AdditionalInformationType;
    value: string;
    key: string;
}