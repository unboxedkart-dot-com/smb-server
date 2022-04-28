import mongoose from 'mongoose';
export declare const VariantsDataSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface VariantsData {
    productCode: string;
    colors: [];
    conditions: [];
    storages: [];
    processors: [];
    rams: [];
}
