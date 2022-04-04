import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handlePrintHello(request: any): Promise<any>;
    handleSendOtp(phoneNumber: number): Promise<string>;
    handleValidate(phoneNumber: number, otp: number): Promise<boolean>;
    handleLoginUser(phoneNumber: number, otp: number): Promise<"false" | {
        accessToken: string;
    }>;
    handleSignupUser(user: User): Promise<"user already exists" | {
        accessToken: string;
    }>;
}
