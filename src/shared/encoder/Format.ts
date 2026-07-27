import { bytesToHex, hexToBytes } from "@noble/ciphers/utils.js";


//IUnit8Array to hex string
export function bytesToHexString(bytes: Uint8Array) {
    return bytesToHex(bytes).toString();
}

export function stringHexToBytes(hexString: string): Uint8Array {
    return hexToBytes(hexString);
}