
export const CategoryAccount = {
    SOCIAL_MEDIA: "SOCIAL_MEDIA",
    EMAIL: "EMAIL",
    KEY: "KEY",
    CARD: "CARD",
    USER: "USER",
    BOOK: "BOOK",
    WEB: "WEB",
    BANK: "BANK",
    PHONE: "PHONE",
} as const

export type CategoryAccount = typeof CategoryAccount[keyof typeof CategoryAccount]
