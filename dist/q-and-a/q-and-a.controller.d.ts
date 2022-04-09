/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';
import { QAndAService } from './q-and-a.service';
export declare class QAndAController {
    private readonly qAndAService;
    constructor(qAndAService: QAndAService);
    handleGetQuestionAndAnswers(productId: string): Promise<(import("mongoose").Document<unknown, any, import("../models/q_and_a.model").QuestionAndAnswer> & import("../models/q_and_a.model").QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleCreateQuestion(request: any, entireBody: CreateQuestionDto): Promise<string>;
    handleApproveQuestion(questionId: string, request: any): Promise<void>;
    handleCreateAnswer(request: any, entireBody: CreateAnswerDto): Promise<string>;
    handleApproveAnswer(answerId: string): Promise<void>;
}
