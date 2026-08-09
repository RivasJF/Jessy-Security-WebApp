import { hexToBytes } from "@noble/curves/utils.js";
import {
  bytesToHexString,
  decript,
  encript,
  generateNounce,
} from "../../../shared";
import type {
  AdditionalInformationEditInput,
  AdditionalInformationInput,
} from "../types/account.types";
import type { AdditionalInformation } from "../types/AccountListResponse.type";
import type { AdditionalInformationType } from "../types/AditionaInformation.type";

/*
privateKey: string private key in hex format from 32 bytes
*/
export function encryptAdditionalInformation(
  additionalInformation: AdditionalInformationInput[],
  privateKey: string,
): AdditionalInformation[] {
  const encryptedInformation: AdditionalInformation[] = [];
  for (const info of additionalInformation) {
    const nonce = generateNounce();
    const encryptedValue = encript(info.value, privateKey, nonce);
    encryptedInformation.push({
      type: info.type as AdditionalInformationType,
      value: encryptedValue,
      key: bytesToHexString(nonce),
    });
  }
  return encryptedInformation;
}

export function decryptAdditionalInformation(
  encryptedInformation: AdditionalInformation | AdditionalInformationEditInput,
  privateKey: string,
): string {
  const res = decript(
    encryptedInformation.value,
    privateKey,
    encryptedInformation.key,
  );
  return res;
}

export function encryptAdditionalInformationInput(
  additionalInformation: AdditionalInformationEditInput,
  privateKey: string,
): AdditionalInformationEditInput {
  const nonce = hexToBytes(additionalInformation.key);
  const encryptedValue = encript(
    additionalInformation.value,
    privateKey,
    nonce,
  );

  return {
    ...additionalInformation,
    value: encryptedValue,
  };
}

export function encryptAdditionalInformationInputNew(
  additionalInformation: AdditionalInformationEditInput,
  privateKey: string,
): AdditionalInformationEditInput {
  const nonce = generateNounce();
  const encryptedValue = encript(
    additionalInformation.value,
    privateKey,
    nonce,
  );

  return {
    ...additionalInformation,
    value: encryptedValue,
    key: bytesToHexString(nonce),
  };
}
