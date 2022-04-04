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
    constructor(answerModel, questionAndAnswerModel, userModel) {
        this.answerModel = answerModel;
        this.questionAndAnswerModel = questionAndAnswerModel;
        this.userModel = userModel;
    }
    async getQuestionAndAnswers(productId) {
        const questionAndAnswer = await this.questionAndAnswerModel.find({ productId: { $eq: productId }, 'questionDetails.isApproved': true });
        return questionAndAnswer;
    }
    async createAnswer(userId, answer, questionId) {
        const userDetails = await this._getUserDetails(userId);
        const newAnswer = new this.answerModel({
            userId: userId,
            userName: userDetails.userName,
            userRole: 'user',
            questionId: questionId,
            answerDetails: {
                answer: answer,
            },
        });
        newAnswer.save();
    }
    async approveQuestion(questionId) {
        await this.questionAndAnswerModel.findByIdAndUpdate(questionId, {
            'questionDetails.isApproved': true,
        });
    }
    async approveAnswer(answerId) {
        await this.answerModel.findByIdAndUpdate(answerId, {
            'answerDetails.isApproved': true,
        });
    }
    async createQuestion(userId, question, productId) {
        const userDetails = await this._getUserDetails(userId);
        const newQuestion = new this.questionAndAnswerModel({
            userId: userId,
            userName: userDetails.userName,
            userRole: 'user',
            productId: productId,
            questionDetails: {
                question: question,
            },
        });
        newQuestion.save();
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
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QAndAService);
exports.QAndAService = QAndAService;
//# sourceMappingURL=q-and-a.service.js.map