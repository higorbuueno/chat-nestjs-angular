export interface UserPayload {
    sub: number; // id
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}