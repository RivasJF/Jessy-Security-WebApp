import type { KeyPair } from "../../../shared";

export interface LoginUserRequest {
  email: string;
  publicKey: string;
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  publicKey: string;
  publicSalt: string;
}

export interface TokenResponse {
  access_token: string;
}

export interface GetSaltResponse {
  email: string;
  salt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
};

export interface LoginMutationResult {
  token: TokenResponse;
  keys: KeyPair;
};
