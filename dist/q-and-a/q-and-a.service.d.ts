/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';
export declare class QAndAService {
    private readonly answerModel;
    private readonly questionAndAnswerModel;
    private readonly questionModel;
    private readonly userModel;
    constructor(answerModel: Model<Answer>, questionAndAnswerModel: Model<QuestionAndAnswer>, questionModel: Model<Question>, userModel: Model<User>);
    getProductQuestionAndAnswers(productId: string): Promise<(import("mongoose").Document<unknown, any, QuestionAndAnswer> & QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createQuestion(userId: string, question: string, productId: string): Promise<void>;
    approveQuestion(userId: string, questionId: string): Promise<void>;
    createAnswer(userId: string, answer: string, questionId: string): Promise<void>;
    approveAnswer(answerId: string): Promise<void>;
    _getUserDetails(userId: string): Promise<{
        userName: string;
    }>;
}
