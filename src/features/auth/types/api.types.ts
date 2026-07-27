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
