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
    answerDetails: {
        isApproved: boolean;
        productId: string;
        answer: string;
        timestamp: Date;
    };
}
