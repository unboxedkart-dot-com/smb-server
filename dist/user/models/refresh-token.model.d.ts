import mongoose from 'mongoose';
export declare const RefreshTokenSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface RefreshTokenModel {
    token: string;
    isActive: boolean;
    userId: string;
}
