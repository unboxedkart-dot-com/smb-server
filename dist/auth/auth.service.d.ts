import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    private httpService;
    constructor(userModel: Model<User>, jwtService: JwtService, httpService: HttpService);
    sendOtp(phoneNumber: number): Promise<string>;
    verifyOtp(phoneNumber: number, otp: number): boolean;
    loginUser(phoneNumber: number, otp: number): Promise<{
        accessToken: string;
    } | "false">;
    validateOtp(phoneNumber: number, otp: number): Promise<boolean>;
    createUser(user: User): Promise<{
        accessToken: string;
    } | "user already exists">;
    createJwt(id: string): Promise<{
        accessToken: string;
    }>;
}
