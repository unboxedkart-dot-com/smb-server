"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QAndAModule = void 0;
const common_1 = require("@nestjs/common");
const q_and_a_service_1 = require("./q-and-a.service");
const q_and_a_controller_1 = require("./q-and-a.controller");
const mongoose_1 = require("@nestjs/mongoose");
const answer_model_1 = require("../models/answer.model");
const q_and_a_model_1 = require("../models/q_and_a.model");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_model_1 = require("../models/user.model");
const question_model_1 = require("../models/question.model");
let QAndAModule = class QAndAModule {
};
QAndAModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Answer', schema: answer_model_1.AnswerSchema },
                { name: 'QuestionAndAnswer', schema: q_and_a_model_1.QuestionAndAnswerSchema },
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Question', schema: question_model_1.QuestionSchema },
            ]),
        ],
        controllers: [q_and_a_controller_1.QAndAController],
        providers: [q_and_a_service_1.QAndAService, jwt_auth_guard_1.JwtAuthGuard],
    })
], QAndAModule);
exports.QAndAModule = QAndAModule;
//# sourceMappingURL=q-and-a.module.js.map