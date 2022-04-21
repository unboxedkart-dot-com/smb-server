import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { Coupon } from 'src/models/coupon.model';
export declare class AuthService {
    private readonly userModel;
    private readonly couponModel;
    private jwtService;
    constructor(userModel: Model<User>, couponModel: Model<Coupon>, jwtService: JwtService);
    sendMail(): Promise<void>;
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
            wishlist: string[];
            cart: string[];
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
        };
    }>;
    _sendAccountCreatedMail(userDoc: any): Promise<void>;
    _sendAccountCreatedMessage(userDoc: any): Promise<void>;
    createJwt(id: string): Promise<string>;
    sendSampleMail(): Promise<void>;
}
