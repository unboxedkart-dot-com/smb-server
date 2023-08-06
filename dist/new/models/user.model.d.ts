import mongoose from 'mongoose';
export declare enum userRoles {
    USER = "USER",
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface User {
    createdTime: string;
    phoneNumber: number;
    userRole: string;
    representativeName: string;
    designation: string;
    emailId: string;
    companyName: string;
    gender: string;
    profilePicUrl: string;
    officeMobileNumber: number;
    isDeactivated: boolean;
    isDeleted: boolean;
}
