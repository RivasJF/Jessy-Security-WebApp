import { bytesToHexString } from "../../../Shared/Encoder/Format";
import { generateSalt, hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";
import type { TokensTypes } from "../../../Shared/Types/Domain/auth/Token.types"

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