import { Model } from 'mongoose';
import { Answer } from 'src/models/answer.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import { Product } from 'src/models/product.model';
import { Question } from 'src/models/question.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';
export declare class QAndAService {
    private readonly answerModel;
    private readonly questionAndAnswerModel;
    private readonly questionModel;
    private readonly productModel;
    private readonly userModel;
    private readonly itemPurchasedUsersModel;
    constructor(answerModel: Model<Answer>, questionAndAnswerModel: Model<QuestionAndAnswer>, questionModel: Model<Question>, productModel: Model<Product>, userModel: Model<User>, itemPurchasedUsersModel: Model<ItemPurchasedUser>);
    approveQuestion(userId: string, questionId: string): Promise<void>;
    approveAnswer(answerId: string): Promise<void>;
    getNewQuestions(): Promise<Question[]>;
    getApprovedQAndA(): Promise<QuestionAndAnswer[]>;
    getNewAnswers(): Promise<Answer[]>;
    getApprovedAnswers(): Promise<Answer[]>;
}
