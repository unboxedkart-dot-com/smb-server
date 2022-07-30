import { AuthService } from '../../auth/auth.service';
import { AuthService as adminAuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly adminAuthService;
    constructor(authService: AuthService, adminAuthService: adminAuthService);
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
    hanldeLoginAdmin(phoneNumber: string, otp: string): Promise<{
        status: string;
        message: string;
        data: {
            accessToken: string;
            userId: string;
        };
    }>;
}
