import mongoose from 'mongoose';
export declare const MoreDetails: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface MoreDetails {
    colorCode: string;
    color: string;
    storage: string;
    storageCode: string;
    connectivityCode: string;
    connectivity: string;
    processorCode: string;
    processor: string;
}
export declare const EnquirySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface EnquiryModel {
    name: string;
    phoneNumber: number;
    advisor: string;
    advisorCode: string;
    enquirySourceCode: string;
    enquirySource: string;
    enquiryStatusCode: string;
    enquiryStatus: string;
    productAvailabilityCode: string;
    productAvailability: string;
    quotedPrice: string;
    askPrice: string;
    categoryCode: string;
    category: string;
    brandCode: string;
    brand: string;
    productCode: string;
    productTitle: string;
    timestamp: number;
    moreDetails: {
        colorCode: string;
        color: string;
        storage: string;
        storageCode: string;
        connectivityCode: string;
        connectivity: string;
        processorCode: string;
        processor: string;
    };
}
