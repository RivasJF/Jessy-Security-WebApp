import { bytesToHexString, decript, encript, generateNounce } from "../../../shared";
import type { AdditionalInformationInput } from "../hooks/useFormAccount.hook";
import type { AdditionalInformation } from "../types/AccountListResponse.type";
import type { AdditionalInformationType } from "../types/AditionaInformation.type";

/*
privateKey: string private key in hex format from 32 bytes
*/
export function encryptAdditionalInformation(additionalInformation: AdditionalInformationInput[], privateKey: string): AdditionalInformation[] {
    let encryptedInformation: AdditionalInformation[] = [];
    for(let info of additionalInformation) {
        const nonce = generateNounce();
        const encryptedValue = encript(info.value, privateKey, nonce);
        encryptedInformation.push({
            type: info.type as AdditionalInformationType,
            value: encryptedValue,
            key: bytesToHexString(nonce)
        });
    }
    return encryptedInformation;
}


export function decryptAdditionalInformation(encryptedInformation: AdditionalInformation, privateKey: string): string {
    const res = decript(encryptedInformation.value, privateKey, encryptedInformation.key);
    return res;
}