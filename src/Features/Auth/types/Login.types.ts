import type { TokensTypes } from "../../../Shared/Types/Domain/auth/Token.types";

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