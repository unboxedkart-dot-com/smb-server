import mongoose from 'mongoose';
export declare const SellerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface SellerModel {
    name: string;
    businessName: string;
    businessDoc: string;
    businessDocNumber: string;
    businessDocUrl: string;
    phoneNumber: number;
    alternatePhoneNumber: number;
    dateJoined: string;
    emailId: string;
    city: string;
}
