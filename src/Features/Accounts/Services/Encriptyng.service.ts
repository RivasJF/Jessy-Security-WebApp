import { decript, encript, generateNounce } from "../../../Shared/Encoder/cypher";
import { bytesToHexString } from "../../../Shared/Encoder/Format";
import type { AdditionalInformationType } from "../../../Shared/Types/Domain/account/AditionaInformation.type";
import type { AdditionalInformation } from "../../../Shared/Types/Domain/account/RegisterAccount.type";
import type { AdditionalInformationInput } from "../Hooks/FormAccount.hook";

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