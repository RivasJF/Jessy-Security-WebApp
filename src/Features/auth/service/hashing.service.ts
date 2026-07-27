import { bytesToHexString, generateKeyPair, generateSalt, hashPassword, type TokensTypes } from "../../../Shared";

export type AccessKeyRegister = {
    keys: TokensTypes.KeyPair,
    salt: string,
}

export async function generateAccessKeyRegister(password: string): Promise<AccessKeyRegister> {
    const saltArray = generateSalt();
    const passwordHash = await hashPassword(password, saltArray);
    const keys = await generateKeyPair(passwordHash);
    const salt = bytesToHexString(saltArray);
    return {
        keys,
        salt,
    }
}