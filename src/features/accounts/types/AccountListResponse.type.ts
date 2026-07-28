import type { AdditionalInformationType } from "./AditionaInformation.type";
import type { CategoryAccount } from "./CategoryAccount.type";

export type AccountListResponse = {
    id: string;
    title: string;
    username: string;
    description: string;
    category: string;
}

export type AccountResponse = {
    id: string;
    title: string;
    username: string;
    description: string;
    category: string;
    additionalInformation: AdditionalInformation[];
}

export type AdditionalInformation = {
    type: AdditionalInformationType;
    value: string;
    key: string;
}

export interface RegisterAccountRequest  {
    title: string;
    username: string;
    description: string;
    category: CategoryAccount;
    additionalInformation: AdditionalInformationRequest[];
}

interface AdditionalInformationRequest {
    type: AdditionalInformationType;
    value: string;
    key: string;
}