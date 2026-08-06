import { bytesToHexString, generateKeyPair, generateSalt, hashPassword, type KeyPair } from "../../../shared";

export type AccessKeyRegister = {
    keys: KeyPair,
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
