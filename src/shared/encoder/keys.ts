import { ed25519 } from "@noble/curves/ed25519.js";
import { bytesToHex, hexToBytes } from "@noble/curves/utils.js";
import type { KeyPair } from "../types/keys.types";

export async function generateKeyPair(secretKeyArray: string): Promise<KeyPair> {
    const secretKeyBytes = hexToBytes(secretKeyArray);
    const publicKey = ed25519.getPublicKey(secretKeyBytes);
    return { 
        secretKey: bytesToHex(secretKeyBytes), 
        publicKey: bytesToHex(publicKey)
    };
}