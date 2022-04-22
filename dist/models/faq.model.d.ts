import mongoose from 'mongoose';
export declare const FaqSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Faq {
    question: string;
    answer: string;
}
