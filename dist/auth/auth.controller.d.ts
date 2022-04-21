import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendMail(): Promise<void>;
    handlePrintHello(request: any): Promise<any>;
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
            wishlist: string[];
            cart: string[];
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
}
