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
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("../../auth/auth.service");
const cancel_order_dto_1 = require("./dto/cancel-order.dto");
const s3_service_1 = require("../../s3/s3.service");
const orders_service_1 = require("./orders.service");
const jwt_auth_guard_1 = require("../../auth/jwt-strategies/jwt-auth.guard");
let OrdersController = class OrdersController {
    constructor(ordersService, authService, s3Service) {
        this.ordersService = ordersService;
        this.authService = authService;
        this.s3Service = s3Service;
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
    async handleAcceptOrder(request, orderItemId) {
        console.log('accepting order');
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.acceptOrder(userId, orderItemId);
            return response;
        }
        else {
            console.log('throwing a new error');
            throw new common_1.UnauthorizedException();
        }
    }
    async handleSetOrderReadyForPickup(request, orderItemId) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.orderReadyForPickUp(userId, orderItemId);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleSerOrderDelivered(request, orderItemId) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.orderDelivered(userId, orderItemId);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleSetOrderShipped(request, orderItemId) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.orderShipped(userId, orderItemId);
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleSetOrderOutForDelivery(request, orderItemId) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.orderOutForDelivery(userId, orderItemId);
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleGetSalesOverview(request, startDate) {
        console.log('starting sales');
        console.log('given date', startDate);
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.ordersService.getSalesOverview(startDate);
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleCancelOrder(request, entireBody) {
        const userId = request.user.userId;
        const response = await this.ordersService.cancelOrder(userId, entireBody);
        return response;
    }
    async handleUploadInvoice(file, request, Body) {
        console.log('uploading invoice', file, typeof file);
        const response = this.s3Service.uploadFile(file);
        return response;
    }
    async handleDeleteAllOrder() {
        const orders = await this.ordersService.deleteAll();
        return orders;
    }
};
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
    (0, common_1.Patch)('accept/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleAcceptOrder", null);
__decorate([
    (0, common_1.Patch)('ready-for-pickup/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleSetOrderReadyForPickup", null);
__decorate([
    (0, common_1.Patch)('delivered/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleSerOrderDelivered", null);
__decorate([
    (0, common_1.Patch)('shipped/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleSetOrderShipped", null);
__decorate([
    (0, common_1.Patch)('out-for-delivery/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleSetOrderOutForDelivery", null);
__decorate([
    (0, common_1.Get)('/sales-overview'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('start-date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetSalesOverview", null);
__decorate([
    (0, common_1.Patch)('/cancel-order'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cancel_order_dto_1.CancelOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleCancelOrder", null);
__decorate([
    (0, common_1.Post)('/upload-invoice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleUploadInvoice", null);
__decorate([
    (0, common_1.Delete)('/deleteall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleDeleteAllOrder", null);
OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => s3_service_1.S3Service))),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        auth_service_1.AuthService,
        s3_service_1.S3Service])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map