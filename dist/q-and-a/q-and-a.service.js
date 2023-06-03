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
    constructor(answerModel, questionAndAnswerModel, questionModel, productModel, userModel, itemPurchasedUsersModel) {
        this.answerModel = answerModel;
        this.questionAndAnswerModel = questionAndAnswerModel;
        this.questionModel = questionModel;
        this.productModel = productModel;
        this.userModel = userModel;
        this.itemPurchasedUsersModel = itemPurchasedUsersModel;
    }
    async getProductQuestionAndAnswers(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(productId);
            console.log('getting q and A');
            console.log('product id', productId, product.productCode);
            const qAndA = await this.questionAndAnswerModel
                .find({
                productCode: product.productCode,
                isApproved: true,
            })
                .limit(5);
            return qAndA;
        }
        else {
            throw new common_1.NotFoundException('product id is not valid');
        }
    }
    async getAllProductQuestionAndAnswers(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(productId);
            const qAndA = await this.questionAndAnswerModel.find({
                productCode: product.productCode,
                isApproved: true,
            });
            return qAndA;
        }
        else {
            throw new common_1.NotFoundException('product id is not valid');
        }
        const questionAndAnswers = await this.questionAndAnswerModel.find({
            productId: productId,
        });
        return questionAndAnswers;
    }
    async createQuestion(userId, entireBody) {
        const userDetails = await this._getUserDetails(userId);
        const productDetails = await this.productModel.findById(entireBody.productId);
        const newQuestion = new this.questionModel({
            userId: userId,
            userName: userDetails.userName,
            userRole: userDetails.userRole,
            productId: entireBody.productId,
            productBrand: productDetails.brandCode,
            productCategory: productDetails.categoryCode,
            productCondition: productDetails.condition,
            question: entireBody.question,
            productCode: productDetails.productCode,
            productDetails: {
                id: entireBody.productId,
                imageUrl: productDetails.imageUrls.coverImage,
                title: productDetails.title,
                color: productDetails.moreDetails.color,
                condition: productDetails.condition,
                brand: productDetails.brand,
                category: productDetails.category,
            },
        });
        newQuestion.save();
        const newQAndA = new this.questionAndAnswerModel({
            questionId: newQuestion._id,
            userId: newQuestion.userId,
            userName: newQuestion.userName,
            userRole: newQuestion.userRole,
            productId: newQuestion.productId,
            productCode: productDetails.productCode,
            productBrand: productDetails.brandCode,
            productCategory: productDetails.categoryCode,
            productCondition: productDetails.condition,
            questionDetails: {
                questionId: newQuestion._id,
                isApproved: newQuestion.isApproved,
                question: newQuestion.question,
                timestamp: newQuestion.timestamp,
            },
            productDetails: {
                id: entireBody.productId,
                imageUrl: productDetails.imageUrls.coverImage,
                title: productDetails.title,
                color: productDetails.moreDetails.color,
                condition: productDetails.condition,
                brand: productDetails.brand,
                category: productDetails.category,
            },
        });
        newQAndA.save();
        return {
            status: 'success',
            message: 'question is added successfully',
        };
    }
    async createAnswer(userId, entireBody) {
        console.log('creating answer', entireBody);
        const user = await this.userModel.findByIdAndUpdate(userId, {
            $push: { answeredQuestionIds: entireBody.questionId },
        });
        const newAnswer = new this.answerModel({
            userId: userId,
            productId: entireBody.productId,
            userName: user.name,
            userRole: 'user',
            questionId: entireBody.questionId,
            questionDetails: {
                questionTitle: entireBody.questionTitle,
                productTitle: entireBody.productTitle,
            },
            answer: entireBody.answer,
        });
        await newAnswer.save();
    }
    async getUserQuestions(userId) {
        const questionAndAnswers = await this.questionAndAnswerModel.find({
            userId: userId,
        });
        return questionAndAnswers;
    }
    async getUserAnswers(userId) {
        const answers = await this.answerModel.find({ userId: userId });
        console.log('answers', answers);
        return answers;
    }
    async _getUserDetails(userId) {
        console.log('user details', userId);
        const user = await this.userModel
            .findById(userId, { name: 1 })
            .select('+userRole');
        console.log('user', user);
        return {
            userName: user.name,
            userRole: user.userRole,
        };
    }
    async getQuestionsFeed(userId) {
        const user = await this.userModel.findById(userId);
        console.log('iiii', user.purchasedItemIds);
        const questions = await this.questionAndAnswerModel.find({
            productId: { $in: user.purchasedItemIds },
            'questionDetails.questionId': { $nin: user.answeredQuestionIds },
        });
        return questions;
    }
};
QAndAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Answer')),
    __param(1, (0, mongoose_1.InjectModel)('QuestionAndAnswer')),
    __param(2, (0, mongoose_1.InjectModel)('Question')),
    __param(3, (0, mongoose_1.InjectModel)('Product')),
    __param(4, (0, mongoose_1.InjectModel)('User')),
    __param(5, (0, mongoose_1.InjectModel)('ItemPurchasedUsers')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QAndAService);
exports.QAndAService = QAndAService;
//# sourceMappingURL=q-and-a.service.js.map