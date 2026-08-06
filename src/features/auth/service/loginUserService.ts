import { generateKeyPair, hashPassword, stringHexToBytes } from "../../../shared";
import { fetchLoginUser, fetchSalt } from "../api/auth.api";
import type { GetSaltResponse, LoginFormData, LoginMutationResult, TokenResponse } from "../types/api.types";


export const loginUserService = async (data: LoginFormData): Promise<LoginMutationResult> => {
  // 1. Fetch salt
  const keysSalt: GetSaltResponse = await fetchSalt(data.email);
  const salt = stringHexToBytes(keysSalt.salt);

  // 2. Create valid keys
  const passwordHash = await hashPassword(data.password, salt);
  const keys = await generateKeyPair(passwordHash);

  // 3. Fetch login
  const accessToken: TokenResponse = await fetchLoginUser({
    email: data.email,
    publicKey: keys.publicKey,
  });

  return { token: accessToken, keys };
};
