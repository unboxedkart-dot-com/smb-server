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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const add_seller_dto_1 = require("./dto/add-seller.dto");
const seller_service_1 = require("./seller.service");
let SellerController = class SellerController {
    constructor(sellerService, authService) {
        this.sellerService = sellerService;
        this.authService = authService;
    }
    async addProduct(request, entireBody) {
        const userId = request.user.userId;
        console.log('user id 1', userId);
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        console.log('isadmin', isAdmin);
        if (isAdmin) {
            const generatedId = await this.sellerService.addSeller(entireBody);
            return {
                data: {
                    response: generatedId,
                },
            };
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async getProduct() {
        const sellers = await this.sellerService.getSellers();
        return sellers;
    }
};
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_seller_dto_1.AddSellerDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getProduct", null);
SellerController = __decorate([
    (0, common_1.Controller)('seller'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [seller_service_1.SellerService,
        auth_service_1.AuthService])
], SellerController);
exports.SellerController = SellerController;
//# sourceMappingURL=seller.controller.js.map