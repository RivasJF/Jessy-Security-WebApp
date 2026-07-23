import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { bytesToHex, hexToBytes, randomBytes } from "@noble/ciphers/utils.js";


/*
text: string clave to encript
key: privatekey in hex format from 32 bytes
nonce: random bytes 24 length
*/
export function encript(text: string, key: string, nonce: Uint8Array) {
    const keyBytes = hexToBytes(key);
    const cipher = xchacha20poly1305(keyBytes,nonce);
    const encrypted = cipher.encrypt(new TextEncoder().encode(text));
    return bytesToHex(encrypted);
}

/*
encrypted: string encrypted text in hex format: String
key: privatekey in hex format from 32 bytes: String
nonce: random bytes 24 length: String
*/
export function decript(encrypted: string, key: string, nonce: string) {
    const keyBytes = hexToBytes(key);
    const encryptedBytes = hexToBytes(encrypted);
    const nonceBytes = hexToBytes(nonce);
    const cipher = xchacha20poly1305(keyBytes,nonceBytes);
    const decrypted = cipher.decrypt(encryptedBytes);
    return new TextDecoder().decode(decrypted);
}

export function generateNounce() {
    const key = randomBytes(24);
    return key;
}