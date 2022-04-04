import mongoose from 'mongoose';
export declare const SearchTermSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface SearchTerm {
    searchTerm: string;
    timestamp: Date;
    isPopular: boolean;
    userId: string;
}
