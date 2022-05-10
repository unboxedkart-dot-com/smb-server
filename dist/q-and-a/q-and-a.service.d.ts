/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Answer } from 'src/models/answer.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import { Product } from 'src/models/product.model';
import { Question } from 'src/models/question.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';
export declare class QAndAService {
    private readonly answerModel;
    private readonly questionAndAnswerModel;
    private readonly questionModel;
    private readonly productModel;
    private readonly userModel;
    private readonly itemPurchasedUsersModel;
    constructor(answerModel: Model<Answer>, questionAndAnswerModel: Model<QuestionAndAnswer>, questionModel: Model<Question>, productModel: Model<Product>, userModel: Model<User>, itemPurchasedUsersModel: Model<ItemPurchasedUser>);
    getProductQuestionAndAnswers(productId: string): Promise<QuestionAndAnswer[]>;
    getAllProductQuestionAndAnswers(productId: string): Promise<QuestionAndAnswer[]>;
    createQuestion(userId: string, entireBody: CreateQuestionDto): Promise<{
        status: string;
        message: string;
    }>;
    approveQuestion(userId: string, questionId: string): Promise<void>;
    createAnswer(userId: string, entireBody: CreateAnswerDto): Promise<void>;
    approveAnswer(answerId: string): Promise<void>;
    getUserQuestions(userId: string): Promise<(import("mongoose").Document<unknown, any, QuestionAndAnswer> & QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUserAnswers(userId: string): Promise<(import("mongoose").Document<unknown, any, Answer> & Answer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    _getUserDetails(userId: string): Promise<{
        userName: string;
        userRole: string;
    }>;
    getQuestionsFeed(userId: string): Promise<(import("mongoose").Document<unknown, any, QuestionAndAnswer> & QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getNewQuestions(): Promise<Question[]>;
    getApprovedQAndA(): Promise<QuestionAndAnswer[]>;
    getNewAnswers(): Promise<Answer[]>;
    getApprovedAnswers(): Promise<Answer[]>;
}
