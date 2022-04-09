import mongoose from 'mongoose';
export declare const QuestionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Question {
    userId: string;
    userName: string;
    userRole: string;
    productId: string;
    isApproved: boolean;
    question: string;
    timestamp: Date;
}
