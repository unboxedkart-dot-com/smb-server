import { SearchTerm } from 'src/models/search_term';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { Coupon } from 'src/models/coupon.model';
export declare class AuthService {
    private readonly userModel;
    private readonly couponModel;
    private readonly searchTermModel;
    private jwtService;
    constructor(userModel: Model<User>, couponModel: Model<Coupon>, searchTermModel: Model<SearchTerm>, jwtService: JwtService);
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
    _getPopularSearches(): Promise<any[]>;
    loginUser(entireBody: LoginDto): Promise<{
        status: string;
        message: string;
        data: {
            accessToken: string;
            wishlist: string[];
            cart: string[];
            userId: string;
            recentSearches: any[];
            popularSearches: any[];
            purchasedItemIds: string[];
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
            userId: string;
            popularSearches: any[];
        };
    }>;
    _sendAccountCreatedMail(userDoc: any): Promise<void>;
    _sendAccountCreatedMessage(userDoc: any): Promise<void>;
    createJwt(id: string): Promise<string>;
    CheckIfAdmin(userId: string): Promise<boolean>;
    sendSampleMail(): Promise<void>;
}
