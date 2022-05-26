import mongoose from 'mongoose';
export declare const ProductDataSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductData {
    productCode: string;
    highlights: string[];
    category: string;
    categoryCode: string;
    seriesCode: string;
    brand: string;
    brandCode: string;
    title: string;
    modelNumber: string;
    modelCode: string;
    processors: [
        {
            code: string;
            title: string;
        }
    ];
    rams: [
        {
            code: string;
            title: string;
        }
    ];
    colors: [
        {
            code: string;
            title: string;
        }
    ];
    storages: [
        {
            code: string;
            title: string;
        }
    ];
    connectivity: [
        {
            code: string;
            title: string;
        }
    ];
    screenSizes: [
        {
            code: string;
            title: string;
        }
    ];
    combinations: [
        {
            code: string;
            title: string;
        }
    ];
}
