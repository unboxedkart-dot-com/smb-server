/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';
export declare class QAndAService {
    private readonly answerModel;
    private readonly questionAndAnswerModel;
    private readonly userModel;
    constructor(answerModel: Model<QuestionAndAnswer>, questionAndAnswerModel: Model<QuestionAndAnswer>, userModel: Model<User>);
    getQuestionAndAnswers(productId: string): Promise<(import("mongoose").Document<unknown, any, QuestionAndAnswer> & QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createAnswer(userId: string, answer: string, questionId: string): Promise<void>;
    approveQuestion(questionId: string): Promise<void>;
    approveAnswer(answerId: string): Promise<void>;
    createQuestion(userId: string, question: string, productId: string): Promise<void>;
    _getUserDetails(userId: string): Promise<{
        userName: string;
    }>;
}
