export const AdditionalInformationType = {
    EMAIL: "EMAIL",
    PIN: "PIN",
    CODE: "CODE",
    PHONE: "PHONE",
    URL: "URL",
    NOTE: "NOTE",
    CUSTOM: "CUSTOM"
} as const

export type AdditionalInformationType = typeof AdditionalInformationType[keyof typeof AdditionalInformationType]