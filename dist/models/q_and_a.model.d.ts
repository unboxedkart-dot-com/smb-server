import mongoose from 'mongoose';
import { Answer } from './answer.model';
export declare const QuestionAndAnswerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface QuestionAndAnswer {
    userId: string;
    userName: string;
    userRole: string;
    questionDetails: {
        isApproved: boolean;
        productId: string;
        question: string;
        timestamp: Date;
    };
    answers: Answer[];
}
