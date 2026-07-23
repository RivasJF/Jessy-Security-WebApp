import type { AdditionalInformationType } from "../AditionaInformation.type";

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