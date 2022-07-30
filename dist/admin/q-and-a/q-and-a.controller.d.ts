import { AuthService } from 'src/auth/auth.service';
import { QAndAService } from './q-and-a.service';
export declare class QAndAController {
    private readonly qAndAService;
    private readonly authService;
    constructor(qAndAService: QAndAService, authService: AuthService);
    handleGetApprovedAnswers(request: any): Promise<import("../../models/answer.model").Answer[]>;
    handleGetNewAnswers(request: any): Promise<import("../../models/answer.model").Answer[]>;
    handleGetNewQuestions(request: any): Promise<import("../../models/question.model").Question[]>;
    handleApproveAnswer(answerId: string, request: any): Promise<void>;
    handleApproveQuestion(questionId: string, request: any): Promise<void>;
    handleGetApprovedQAndA(request: any): Promise<import("../../models/q_and_a.model").QuestionAndAnswer[]>;
}
