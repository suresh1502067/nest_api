import { AuthService } from "./auth.services";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signup(): string;
    signin(): string;
}
