import mongoose from 'mongoose';
export declare const ProductSpecificationsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductSpecifications {
    productId: string;
    productCode: string;
    specs: [
        {
            title: string;
            values: string[];
        }
    ];
}
