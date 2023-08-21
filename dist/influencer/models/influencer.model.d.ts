import mongoose from 'mongoose';
export declare const InfluencerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Influencer {
    phoneNumber: number;
    name: string;
    emailId: string;
    contactsCount: number;
    profilePicUrl: string;
    state: string;
    district: string;
    city: string;
    pinCode: number;
    isDeactivated: boolean;
    isDeleted: boolean;
}
