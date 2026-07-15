import type { AdditionalInformationInput } from "../../Features/Accounts/Hooks/FormAccount.hook";
import { bytesToHexString, encript, generateRamdomKey24, generateRamdomKey32 } from "../Encoder/cypher";
import type { AdditionalInformationType } from "../Types/Domain/account/AditionaInformation.type";
import type { AdditionalInformation } from "../Types/Domain/account/RegisterAccount.type";


export function encryptAdditionalInformation(additionalInformation: AdditionalInformationInput[], key: string): AdditionalInformation[] {
    let encryptedInformation: AdditionalInformation[] = [];
    for(let info of additionalInformation) {
        const nonce = generateRamdomKey24();
        const encryptedValue = encript(info.value, key, nonce);
        encryptedInformation.push({
            type: info.type as AdditionalInformationType,
            value: encryptedValue,
            key: bytesToHexString(nonce), // Store the nonce as a hex string for later decryption
        });
    }
    return encryptedInformation;
}

export function decryptAdditionalInformation(encryptedInformation: AdditionalInformation[]): AdditionalInformation[] {
    return encryptedInformation.map(info => ({
        type: info.type,
        value: atob(info.value), // Simple base64 decoding for demonstration; replace with actual decryption logic
        key: info.key,
    }));
}