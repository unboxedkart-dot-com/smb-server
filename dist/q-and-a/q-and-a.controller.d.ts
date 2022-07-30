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
    handleGetProductQandA(productId: string): Promise<import("../models/q_and_a.model").QuestionAndAnswer[]>;
    handleGetAllProductQandA(productId: string): Promise<import("../models/q_and_a.model").QuestionAndAnswer[]>;
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
    handleCreateAnswer(request: any, entireBody: CreateAnswerDto): Promise<void>;
    handleGetQuestionsFeed(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/q_and_a.model").QuestionAndAnswer> & import("../models/q_and_a.model").QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
