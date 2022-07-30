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
exports.CouponsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_service_1 = require("../../auth/auth.service");
const jwt_auth_guard_1 = require("../../auth/jwt-strategies/jwt-auth.guard");
const coupons_service_1 = require("./coupons.service");
const create_coupon_dto_1 = require("./dto/create-coupon.dto");
const mongoose_2 = require("mongoose");
let CouponsController = class CouponsController {
    constructor(couponsService, authService, couponModel) {
        this.couponsService = couponsService;
        this.authService = authService;
        this.couponModel = couponModel;
    }
    async handleGetAllCoupons(request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.couponsService.getCoupons();
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleCreateCoupon(request, entireBody) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.couponsService.createCoupon(entireBody);
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async getCoupons() {
        const coupons = await this.couponModel.find({ isPersonalCoupon: false });
        return coupons;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all-coupons'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "handleGetAllCoupons", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "handleCreateCoupon", null);
CouponsController = __decorate([
    (0, common_1.Controller)('coupons'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(2, (0, mongoose_1.InjectModel)('Coupon')),
    __metadata("design:paramtypes", [coupons_service_1.CouponsService,
        auth_service_1.AuthService,
        mongoose_2.Model])
], CouponsController);
exports.CouponsController = CouponsController;
//# sourceMappingURL=coupons.controller.js.map