/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';
import { QAndAService } from './q-and-a.service';
export declare class QAndAController {
    private readonly qAndAService;
    private readonly authService;
    constructor(qAndAService: QAndAService, authService: AuthService);
    handleGetQuestionAndAnswers(productId: string): Promise<import("../models/q_and_a.model").QuestionAndAnswer[]>;
    handleGetProductReviews(productId: string): Promise<import("../models/q_and_a.model").QuestionAndAnswer[]>;
    handleGetAllProductReviews(productId: string): Promise<import("../models/q_and_a.model").QuestionAndAnswer[]>;
    handleGetAnswers(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/answer.model").Answer> & import("../models/answer.model").Answer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleGetQuestions(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/q_and_a.model").QuestionAndAnswer> & import("../models/q_and_a.model").QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleCreateQuestion(request: any, entireBody: CreateQuestionDto): Promise<{
        status: string;
        message: string;
    }>;
    handleApproveQuestion(questionId: string, request: any): Promise<void>;
    handleCreateAnswer(request: any, entireBody: CreateAnswerDto): Promise<void>;
    handleApproveAnswer(answerId: string, request: any): Promise<void>;
    handleGetQuestionsFeed(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/q_and_a.model").QuestionAndAnswer> & import("../models/q_and_a.model").QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleGetNewQuestions(request: any): Promise<import("../models/question.model").Question[]>;
    handleGetApprovedQAndA(request: any): Promise<import("../models/q_and_a.model").QuestionAndAnswer[]>;
    handleGetNewAnswers(request: any): Promise<import("../models/answer.model").Answer[]>;
    handleGetApprovedAnswers(request: any): Promise<import("../models/answer.model").Answer[]>;
}
