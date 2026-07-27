import type { TokensTypes } from "../../../shared";

export namespace LoginTypes {
    export type LoginFormData = {
      email: string;
      password: string;
    };
    export type LoginMutationResult = {
      token: TokensTypes.TokenResponse;
      keys: TokensTypes.KeyPair;
    };
}