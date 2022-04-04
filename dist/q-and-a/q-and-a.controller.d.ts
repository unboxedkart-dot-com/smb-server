/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';
import { QAndAService } from './q-and-a.service';
export declare class QAndAController {
    private readonly qAndAService;
    constructor(qAndAService: QAndAService);
    handleCreateQuestion(request: any, entireBody: CreateQuestionDto): Promise<string>;
    handleCreateAnswer(request: any, entireBody: CreateAnswerDto): Promise<string>;
    handleApproveQuestion(questionId: string): Promise<void>;
    handleApproveAnswer(answerId: string): Promise<void>;
    handleGetQuestionAndAnswers(productId: string): Promise<(import("mongoose").Document<unknown, any, import("../models/q_and_a.model").QuestionAndAnswer> & import("../models/q_and_a.model").QuestionAndAnswer & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
