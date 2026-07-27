export namespace TokensTypes {
  export type KeyPair = {
    secretKey: string;
    publicKey: string;
  };
  export type TokenResponse = {
    access_token: string;
  };
  export type SaltResponse = {
    email: string;
    salt: string;
  };
}
