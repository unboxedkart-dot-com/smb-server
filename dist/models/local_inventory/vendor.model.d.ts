import mongoose from 'mongoose';
export declare const VendorSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface VendorModel {
    name: string;
    idProofDoc: string;
    idProofNumber: string;
    phoneNumber: number;
    alternatePhoneNumber: number;
    city: string;
    idProofUrl: string;
}
