export interface AuthToken {
    token_type?: "accessToken" | "refreshToken";
    _id: string;
    name: string;
    role?: string;
    exp: number;
    iat?: number;
    email?: string;
    avatar?: string;
}
