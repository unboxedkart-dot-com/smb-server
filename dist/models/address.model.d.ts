import mongoose from 'mongoose';
export declare const AddressSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Address {
    name: string;
    phoneNumber: string;
    alternatePhoneNumber: string;
    doorNo: string;
    street: string;
    cityName: string;
    stateName: string;
    landmark: string;
    addressType: string;
}
