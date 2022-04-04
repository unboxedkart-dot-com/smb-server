import mongoose from 'mongoose';
export declare const StoreLocationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface StoreLocation {
    storeName: string;
    streetName: string;
    cityName: string;
    pinCode: number;
    directionsUrl: string;
    storeTimings: string;
    storeOpenDays: string;
    contactNumber: number;
    alternateContactNumber: number;
}
