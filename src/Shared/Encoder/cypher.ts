import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { bytesToHex, hexToBytes, randomBytes } from "@noble/ciphers/utils.js";

export function generateRamdomKey32() {
    const key = randomBytes(32);
    return key;
}
export function generateRamdomKey24() {
    const key = randomBytes(24);
    return key;
}

export function encript(text: string, key: string, nonce: Uint8Array) {
    const keyBytes = hexToBytes(key);
    const cipher = xchacha20poly1305(keyBytes,nonce);
    const encrypted = cipher.encrypt(new TextEncoder().encode(text));
    return bytesToHex(encrypted);
}

export function bytesToHexString(bytes: Uint8Array) {
    return bytesToHex(bytes).toString();
}

export function decript(encrypted: string, key: string, nonce: Uint8Array) {
    const keyBytes = hexToBytes(key);
    const encryptedBytes = hexToBytes(encrypted);
    const cipher = xchacha20poly1305(keyBytes,nonce);
    const decrypted = cipher.decrypt(encryptedBytes);
    return new TextDecoder().decode(decrypted);
}