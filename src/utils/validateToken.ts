import { AuthToken } from "@/interface/jwt-payload";
import { jwtDecode } from "jwt-decode";

function isValidToken(token: string): boolean {
    try {
        const decodedToken = jwtDecode<AuthToken>(token)
        return decodedToken.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export default isValidToken;