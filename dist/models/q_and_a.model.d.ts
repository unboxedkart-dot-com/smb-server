import mongoose from 'mongoose';
import { Answer } from './answer.model';
export declare const QuestionAndAnswerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface QuestionAndAnswer {
    questionId: string;
    userId: string;
    userName: string;
    userRole: string;
    productId: string;
    productCode: string;
    productCategory: string;
    productBrand: string;
    productCondition: string;
    isApproved: boolean;
    questionDetails: {
        questionId: string;
        isApproved: boolean;
        question: string;
        timestamp: Date;
    };
    productDetails: {
        id: string;
        imageUrl: string;
        title: string;
        color: string;
        condition: string;
        brand: string;
        category: string;
    };
    answers: Answer[];
}
