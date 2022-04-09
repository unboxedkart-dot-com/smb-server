"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QAndAService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QAndAService = class QAndAService {
    constructor(answerModel, questionAndAnswerModel, questionModel, userModel) {
        this.answerModel = answerModel;
        this.questionAndAnswerModel = questionAndAnswerModel;
        this.questionModel = questionModel;
        this.userModel = userModel;
    }
    async getProductQuestionAndAnswers(productId) {
        const questionAndAnswers = await this.questionAndAnswerModel.find({ productId: productId });
        return questionAndAnswers;
    }
    async createQuestion(userId, question, productId) {
        const userDetails = await this._getUserDetails(userId);
        const newQuestion = new this.questionModel({
            userId: userId,
            userName: userDetails.userName,
            userRole: 'user',
            productId: productId,
            question: question,
        });
        newQuestion.save();
    }
    async approveQuestion(userId, questionId) {
        const question = await this.questionModel
            .findByIdAndUpdate(questionId, {
            isApproved: true,
        })
            .select('+userId');
        console.log('questions', question);
        const newQAndA = new this.questionAndAnswerModel({
            userId: question.userId,
            userName: question.userName,
            userRole: question.userRole,
            productId: question.productId,
            questionDetails: {
                questionId: question._id,
                isApproved: question.isApproved,
                question: question.question,
                timestamp: question.timestamp,
            },
        });
        newQAndA.save();
        console.log('updating question', question);
    }
    async createAnswer(userId, answer, questionId) {
        const userDetails = await this._getUserDetails(userId);
        const newAnswer = new this.answerModel({
            userId: userId,
            userName: userDetails.userName,
            userRole: 'user',
            questionId: questionId,
            answer: answer,
        });
        newAnswer.save();
    }
    async approveAnswer(answerId) {
        const answer = await this.answerModel
            .findByIdAndUpdate(answerId, {
            isApproved: true,
        })
            .select('+userId');
        console.log("new answer", answer);
        await this.questionAndAnswerModel.findOneAndUpdate({
            'questionDetails.questionId': answer.questionId,
        }, { $push: { answers: answer } });
    }
    async _getUserDetails(userId) {
        console.log('user details', userId);
        const user = await this.userModel.findById(userId, { name: 1 });
        console.log('user', user);
        return {
            userName: user.name,
        };
    }
};
QAndAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Answer')),
    __param(1, (0, mongoose_1.InjectModel)('QuestionAndAnswer')),
    __param(2, (0, mongoose_1.InjectModel)('Question')),
    __param(3, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QAndAService);
exports.QAndAService = QAndAService;
//# sourceMappingURL=q-and-a.service.js.map