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
exports.VariantsController = void 0;
const common_1 = require("@nestjs/common");
const variants_service_1 = require("./variants.service");
let VariantsController = class VariantsController {
    constructor(variantsService) {
        this.variantsService = variantsService;
    }
    async handleAddVariantsData() {
        await this.variantsService.addVariantsData();
    }
    async handleGetProductVariants(productCode) {
        const response = await this.variantsService.getVariantsData(productCode);
        return response;
    }
};
__decorate([
    (0, common_1.Post)('/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VariantsController.prototype, "handleAddVariantsData", null);
__decorate([
    (0, common_1.Get)('/product/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VariantsController.prototype, "handleGetProductVariants", null);
VariantsController = __decorate([
    (0, common_1.Controller)('variants'),
    __metadata("design:paramtypes", [variants_service_1.VariantsService])
], VariantsController);
exports.VariantsController = VariantsController;
//# sourceMappingURL=variants.controller.js.map