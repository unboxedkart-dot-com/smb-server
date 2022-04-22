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
exports.FaqsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
let FaqsService = class FaqsService {
    constructor(faqModel, productModel) {
        this.faqModel = faqModel;
        this.productModel = productModel;
    }
    async getFaqs() {
        const faqs = await this.faqModel.find({});
        return faqs;
    }
    async createFaq(userId, entireBody) {
        const newFaq = new this.faqModel({
            question: entireBody.question,
            answer: entireBody.answer,
        });
        newFaq.save();
        console.log('new faq', newFaq);
        return newFaq;
    }
    async updateFaq() { }
    async deleteFaq() { }
};
FaqsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_decorators_1.InjectModel)('Faq')),
    __param(1, (0, mongoose_decorators_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], FaqsService);
exports.FaqsService = FaqsService;
//# sourceMappingURL=faqs.service.js.map