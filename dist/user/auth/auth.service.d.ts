import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { RefreshTokenModel } from 'src/user/models/refresh-token.model';
import { User } from 'src/user/models/user.model';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthService {
    private readonly userModel;
    private readonly refreshTokenModel;
    private jwtService;
    constructor(userModel: Model<User>, refreshTokenModel: Model<RefreshTokenModel>, jwtService: JwtService);
    setStatus(): Promise<void>;
    deleteAccount(userId: string): Promise<void>;
    deactivateAccount(userId: string): Promise<void>;
    sendOtp(phoneNumber: number): Promise<{
        status: string;
        message: string;
    }>;
    verifyOtp(phoneNumber: number, otp: number): Promise<boolean>;
    resendOtp(phoneNumber: number, type: number): Promise<{
        status: string;
        message: string;
    }>;
    loginUser(entireBody: LoginDto): Promise<{
        status: string;
        message: string;
        data: {
            accessToken: string;
            userId: string;
        };
    }>;
    validateOtp(phoneNumber: number, otp: number): Promise<{
        status: string;
        message: string;
        content: string;
    } | {
        status: string;
        message: string;
        content?: undefined;
    }>;
    createUser(entireBody: SignUpDto): Promise<{
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
    _sendAccountCreatedMail(userDoc: any): Promise<void>;
    _sendAccountCreatedMessage(userDoc: any): Promise<void>;
    createJwt(id: string): Promise<string>;
    addNewRefreshToken(userId: string, previousToken: string): Promise<void>;
    newAccessToken(userId: string, refreshToken: string): Promise<"you are not authorised" | {
        accessToken: string;
        refreshToken: any;
    }>;
}
