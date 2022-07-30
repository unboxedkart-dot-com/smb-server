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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const s3_service_1 = require("../s3/s3.service");
const orders_service_1 = require("./orders.service");
let OrdersController = class OrdersController {
    constructor(ordersService, authService, s3Service) {
        this.ordersService = ordersService;
        this.authService = authService;
        this.s3Service = s3Service;
    }
    async handleGetAllOrders(request, status) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.getAllOrders(status);
            return response;
        }
        else {
            console.log('throwing a new error');
            throw new common_1.UnauthorizedException();
        }
    }
    async handleGetReferrals(request) {
        const userId = request.user.userId;
        const referrals = await this.ordersService.getReferrals(userId);
        return referrals;
    }
    async handleCreateOrder(request) {
        const userId = request.user.userId;
        const orderNumber = this._generateOrderNumber();
        return await this.ordersService.createOrder(userId);
    }
    async handleGetOrdersItems(request) {
        const userId = request.user.userId;
        const orders = await this.ordersService.getOrderItems(userId);
        return orders;
    }
    async handleGetOrder(id, request) {
        const userId = request.user.userId;
        const order = await this.ordersService.getOrder(userId, id);
        console.log('order is', order);
        return order;
    }
    async handleGetOrderItem(request, orderId) {
        console.log('getting single order item', orderId);
        const userId = request.user.userId;
        const order = await this.ordersService.getOrderItem(userId, orderId);
        return order;
    }
    async handleSendInvoiceCopy(request, orderId) {
        const userId = request.user.userId;
        await this.ordersService.sendInvoiceCopy(userId, orderId);
    }
    _generateOrderNumber() {
        const orderCode = 'OD';
        const randomNumber = Math.floor(10000000000000 + Math.random() * 90000000000000);
        const orderNumber = orderCode + randomNumber.toString();
        return orderNumber;
    }
};
__decorate([
    (0, common_1.Get)('/all-orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetAllOrders", null);
__decorate([
    (0, common_1.Get)('/referrals'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetReferrals", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleCreateOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetOrdersItems", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/order'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetOrder", null);
__decorate([
    (0, common_1.Get)('/order-item'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetOrderItem", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleSendInvoiceCopy", null);
OrdersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('orders'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => s3_service_1.S3Service))),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        auth_service_1.AuthService,
        s3_service_1.S3Service])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map