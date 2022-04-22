import mongoose from 'mongoose';
export declare const ProductSpecsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductSpecs {
    productId: string;
    productCode: string;
    specs: [
        {
            title: string;
            values: string[];
        }
    ];
}
