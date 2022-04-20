import mongoose from 'mongoose';
export declare enum UserRoles {
    USER = "user",
    SELLER = "registered seller",
    ADMIN = "administrator"
}
export declare const AnswerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Answer {
    userId: string;
    userName: string;
    userRole: string;
    questionId: string;
    isApproved: boolean;
    answer: string;
    questionDetails: {
        questionTitle: string;
        productTitle: string;
        timestamp: Date;
    };
    timestamp: Date;
}
