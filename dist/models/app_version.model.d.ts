import mongoose from 'mongoose';
export declare const AppVersionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface AppVersion {
    version: string;
    minAppVersion: string;
    publishDate: string;
    description: string;
}
