import mongoose from 'mongoose';
export declare const ProductImagesSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductImages {
    productCode: string;
    colorCode: string;
    coverImage: string;
    images: string[];
    thumbnails: string[];
    count: number;
}
