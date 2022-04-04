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
exports.AddressesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const addresses_service_1 = require("./addresses.service");
const dto_1 = require("./dto");
let AddressesController = class AddressesController {
    constructor(addressesService) {
        this.addressesService = addressesService;
    }
    async handleGetAddress(request) {
        const userId = request.user.userId;
        const addresses = await this.addressesService.getAddresses(userId);
        return addresses;
    }
    async handleCreateAddress(entireBody, request) {
        const userId = request.user.userId;
        const result = await this.addressesService.createAddress(entireBody, userId);
        return result;
    }
    async handleUpdateAddress(entireBody) {
        const result = await this.addressesService.updateAddress(entireBody);
        return result;
    }
    async handleDeleteAddress(id) {
        const result = await this.addressesService.deleteAddress(id);
        return result;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "handleGetAddress", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddAddressDto, Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "handleCreateAddress", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "handleUpdateAddress", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "handleDeleteAddress", null);
AddressesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('addresses'),
    __metadata("design:paramtypes", [addresses_service_1.AddressesService])
], AddressesController);
exports.AddressesController = AddressesController;
//# sourceMappingURL=addresses.controller.js.map