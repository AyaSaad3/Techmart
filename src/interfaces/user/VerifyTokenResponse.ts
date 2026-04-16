import { DecodedToken } from "./DecodedToken";

export interface VerifyTokenResponse {
    message: string;
    decoded: DecodedToken;
}