
export namespace UserApiTypes {
    export type RegisterUserRequest = {
        username: string;
        email: string;
        publicKey: string;
        publicSalt: string;
    };

    export type LoginUserRequest = {
        email: string;
        password: string;
        salt: string;
    };

    export type UserResponse = {
        id: number;
        username: string;
        email: string;
    };
}