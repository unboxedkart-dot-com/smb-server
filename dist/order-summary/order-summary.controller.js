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
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const add_address_dto_1 = require("./dto/add-address.dto");
const add_selected_store_dto_1 = require("./dto/add-selected-store.dto");
const create_order_summary_dto_1 = require("./dto/create-order-summary.dto");
const update_count_dto_1 = require("./dto/update-count.dto");
const verify_payment_dto_1 = require("./dto/verify-payment.dto");
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
    async handleAddCoupon(request, couponCode) {
        const userId = request.user.userId;
        const result = await this.orderSummaryService.addCouponDetails(userId, couponCode);
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
    async handleGetPartialPaymentAmount(request) {
        const userId = request.user.userId;
        const response = await this.orderSummaryService.getPartialPaymentAmount(userId);
        return response;
    }
    async handleUpdatePaymentMethod(request, paymentMethod) {
        const userId = request.user.userId;
        const response = await this.orderSummaryService.addPaymentMethod(userId, paymentMethod);
        return response;
    }
    async handleVerifyPayment(request, entireBody) {
        const userId = request.user.userId;
        const response = await this.orderSummaryService.verifyPaymentSignature(userId, entireBody);
        console.log('response verify', response);
        return response;
    }
    async handleVerifyPartialPayment(request, entireBody) {
        const userId = request.user.userId;
        const response = await this.orderSummaryService.verifyPartialPaymentSignature(userId, entireBody);
        console.log('response partial verify', response);
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
    __param(1, (0, common_1.Body)('couponCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleAddCoupon", null);
__decorate([
    (0, common_1.Patch)('update/store-details'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_selected_store_dto_1.AddSelectedStoreDto]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleAddStoreDetails", null);
__decorate([
    (0, common_1.Patch)('update/address-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_address_dto_1.AddDeliveryAddressDto, Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleAddDeliveryAddress", null);
__decorate([
    (0, common_1.Get)('payable-amount'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleGetPayableAmount", null);
__decorate([
    (0, common_1.Get)('partial-payment'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleGetPartialPaymentAmount", null);
__decorate([
    (0, common_1.Patch)('update/payment-method'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('paymentMethod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleUpdatePaymentMethod", null);
__decorate([
    (0, common_1.Post)('verify-payment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_payment_dto_1.VerifyPaymentDto]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleVerifyPayment", null);
__decorate([
    (0, common_1.Post)('verify-partial-payment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_payment_dto_1.VerifyPaymentDto]),
    __metadata("design:returntype", Promise)
], OrderSummaryController.prototype, "handleVerifyPartialPayment", null);
OrderSummaryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('order-summary'),
    __metadata("design:paramtypes", [order_summary_service_1.OrderSummaryService])
], OrderSummaryController);
exports.OrderSummaryController = OrderSummaryController;
//# sourceMappingURL=order-summary.controller.js.map