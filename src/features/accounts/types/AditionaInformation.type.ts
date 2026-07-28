export const AdditionalInformationType = {
    PASSWORD: "PASSWORD",
    EMAIL: "EMAIL",
    PIN: "PIN",
    CODE: "CODE",
    PHONE: "PHONE",
    URL: "URL",
    NOTE: "NOTE",
    CUSTOM: "CUSTOM"
} as const

export type AdditionalInformationType = typeof AdditionalInformationType[keyof typeof AdditionalInformationType]