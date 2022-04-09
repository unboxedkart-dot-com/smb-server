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
exports.OrderSummaryController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../addresses/dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const add_store_location_dto_1 = require("../store-location/dto/add-store-location.dto");
const create_order_summary_dto_1 = require("./dto/create-order-summary.dto");
const update_count_dto_1 = require("./dto/update-count.dto");
const order_summary_service_1 = require("./order-summary.service");
let OrderSummaryController = class OrderSummaryController {
    constructor(orderSummaryService) {
        this.orderSummaryService = orderSummaryService;
    }
    async handleGetOrderSummaryItems(request) {
        const userId = request.user.userId;
        const result = await this.orderSummaryService.getOrderSummaryItems(userId);
        return result;
    }
    async handleCreateOrderSummaryItems(request, entireBody) {
        const userId = request.user.userId;
        const result = await this.orderSummaryService.createOrderSummaryItems(userId, entireBody);
        return result;
    }
    async handleUpdateCount(request, entireBody) {
        const userId = request.user.userId;
        const result = await this.orderSummaryService.updateCount(userId, entireBody);
        return result;
    }
    async handleAddCoupon(request, entireBody) {
        const userId = request.user.userId;
        const result = await this.orderSummaryService.addCouponDetails(userId, entireBody);
        return result;
    }
    async handleAddStoreDetails(request, entireBody) {
        const userId = request.user.userId;
        console.log('entre body', entireBody);
        const response = await this.orderSummaryService.addSelectedStoreDetails(userId, entireBody);
        return response;
    }
    async handleAddDeliveryAddress(entireBody, request) {
        console.log('addddd bodt', entireBody);
        const userId = request.user.userId;
        const response = await this.orderSummaryService.addDeliveryAddress(userId, entireBody);
        return response;
    }
    async handleGetPayableAmount(request) {
        const userId = request.user.userId;
        const response = await this.orderSummaryService.getPayableAmount(userId);
        return response;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleGetOrderSummaryItems", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_summary_dto_1.CreateOrderSummaryDto]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleCreateOrderSummaryItems", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_count_dto_1.UpdateProductCountDto]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleUpdateCount", null);
__decorate([
    (0, common_1.Patch)('update/coupon'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleAddCoupon", null);
__decorate([
    (0, common_1.Patch)('update/store-details'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_store_location_dto_1.AddStoreLocationDto]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleAddStoreDetails", null);
__decorate([
    (0, common_1.Patch)('update/address-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddAddressDto, Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleAddDeliveryAddress", null);
__decorate([
    (0, common_1.Get)('payable-amount'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleGetPayableAmount", null);
OrderSummaryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('order-summary'),
    __metadata("design:paramtypes", [order_summary_service_1.OrderSummaryService])
], OrderSummaryController);
exports.OrderSummaryController = OrderSummaryController;
//# sourceMappingURL=order-summary.controller.js.map