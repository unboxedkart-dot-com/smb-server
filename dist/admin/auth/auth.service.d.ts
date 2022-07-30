import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Admin } from 'src/models/admin/admin.model';
import { RefreshTokenModel } from 'src/models/refresh-token.model';
export declare class AuthService {
    private readonly refreshTokenModel;
    private jwtService;
    private readonly adminModel;
    constructor(refreshTokenModel: Model<RefreshTokenModel>, jwtService: JwtService, adminModel: Model<Admin>);
    loginAdmin(phoneNumber: string): Promise<{
        status: string;
        message: string;
        data: {
            accessToken: string;
            userId: string;
        };
    }>;
    addNewRefreshToken(userId: string, previousToken: string): Promise<void>;
    newAccessToken(userId: string, refreshToken: string): Promise<"you are not authorised" | {
        accessToken: string;
        refreshToken: any;
    }>;
    createJwt(id: string): Promise<string>;
}
