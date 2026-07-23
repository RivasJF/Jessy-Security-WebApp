import { randomBytes } from "@noble/ciphers/utils.js";
import { argon2id, type IArgon2Options } from "hash-wasm";

export async function hashPassword(password: string, salt: Uint8Array): Promise<string> {
    if (typeof password !== "string" || password.length === 0) {
        throw new Error("Password must be a non-empty string.");
    }
    if (!(salt instanceof Uint8Array) || salt.length === 0) {
        throw new Error("Salt must be a non-empty Uint8Array.");
    }

    const options:IArgon2Options = {
        password: password,
        salt: salt,
        iterations: 3, // Number of iterations  
        parallelism: 4, // Number of parallel threads
        memorySize: 1 << 14, // Memory usage in KiB
        hashLength: 32, // Length of the resulting hash in bytes
        outputType: "hex"
    }

    return await argon2id(options);
}

export function generateSalt() {
    const salt = randomBytes(32);
    return salt;
}