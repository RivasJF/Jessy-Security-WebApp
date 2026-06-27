export namespace TokensTypes {
  export type KeyPair = {
    secretKey: string;
    publicKey: string;
  };
  export type TokenResponse = {
    accessToken: string;
  };
  export type SaltResponse = {
    email: string;
    salt: string;
  };
}
