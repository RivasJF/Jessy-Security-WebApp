export type AccountResponse = {
    id: string;
    title: string;
    username: string;
    description: string;
    category: string;
    additionalInformation: AdditionalInformation[];
}

export type AdditionalInformation = {
    type: string;
    value: string;
    key: string;
}