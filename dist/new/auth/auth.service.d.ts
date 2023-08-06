import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { RefreshTokenModel } from 'src/models/refresh-token.model';
import { User } from 'src/models/user.model';
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
    _getRecentSearches(recentSearches: any): Promise<any[]>;
    loginUser(entireBody: LoginDto): Promise<{
        status: string;
        message: string;
        data: {
            accessToken: string;
            wishlist: any;
            cart: any;
            userId: any;
            recentSearches: any[];
            purchasedItemIds: any;
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
    _createCouponCode(name: string): string;
    createUser(entireBody: SignUpDto): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            accessToken: string;
            userId: any;
        };
    }>;
    _sendAccountCreatedMail(userDoc: any): Promise<void>;
    _sendAccountCreatedMessage(userDoc: any): Promise<void>;
    createJwt(id: string): Promise<string>;
    CheckIfAdmin(userId: string): Promise<boolean>;
    createDummyRT(userId: string): any;
    addNewRefreshToken(userId: string, previousToken: string): Promise<void>;
    newAccessToken(userId: string, refreshToken: string): Promise<"you are not authorised" | {
        accessToken: string;
        refreshToken: any;
    }>;
    sendSampleMail(): Promise<void>;
}
