import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handleHello(): Promise<void>;
    handleDeactivateAccount(request: any): Promise<void>;
    handleDeleteAccount(request: any): Promise<void>;
    handleSendOtp(phoneNumber: string): Promise<{
        status: string;
        message: string;
    }>;
    handleResendOtp(phoneNumber: string, type: string): Promise<{
        status: string;
        message: string;
    }>;
    handleValidate(phoneNumber: string, otp: string): Promise<{
        status: string;
        message: string;
        content: string;
    } | {
        status: string;
        message: string;
        content?: undefined;
    }>;
    handleLoginUser(entireBody: LoginDto): Promise<{
        status: string;
        message: string;
        data: {
            accessToken: string;
            userId: string;
        };
    }>;
    handleSignupUser(entireBody: SignUpDto): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            accessToken: string;
            userId: string;
        };
    }>;
    handleGetNewAccessToken(refreshToken: string, request: any): Promise<"you are not authorised" | {
        accessToken: string;
        refreshToken: any;
    }>;
}
