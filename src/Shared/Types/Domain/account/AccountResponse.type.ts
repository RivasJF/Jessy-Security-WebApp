export type AccountResponse = {
    id: string;
    title: string;
    username: string;
    description: string;
    category: string;
    additionalInformation: AdditionalInformationResponse[];
}

export type AdditionalInformationResponse = {
    type: string;
    value: string;
}