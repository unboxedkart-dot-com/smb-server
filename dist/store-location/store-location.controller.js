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
exports.StoreLocationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const add_store_location_dto_1 = require("./dto/add-store-location.dto");
const store_location_service_1 = require("./store-location.service");
let StoreLocationController = class StoreLocationController {
    constructor(storeLocationService) {
        this.storeLocationService = storeLocationService;
    }
    async handleAddStoreLocation(entireBody, request) {
        const userId = request.user.userId;
        await this.storeLocationService.addStoreLocation(userId, entireBody);
    }
    async handleGetStoreLocation() {
        const locations = await this.storeLocationService.getStoreLocations();
        return locations;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_store_location_dto_1.AddStoreLocationDto, Object]),
    __metadata("design:returntype", Promise)
], StoreLocationController.prototype, "handleAddStoreLocation", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreLocationController.prototype, "handleGetStoreLocation", null);
StoreLocationController = __decorate([
    (0, common_1.Controller)('store-location'),
    __metadata("design:paramtypes", [store_location_service_1.StoreLocationService])
], StoreLocationController);
exports.StoreLocationController = StoreLocationController;
//# sourceMappingURL=store-location.controller.js.map