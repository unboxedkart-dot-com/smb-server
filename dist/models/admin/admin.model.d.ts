import mongoose from 'mongoose';
export declare const AdminSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Admin {
    phoneNumber: Number;
    name: string;
    createdTime: Date;
    emailId: string;
    gender: string;
    lastLoggedIn: Date;
}
