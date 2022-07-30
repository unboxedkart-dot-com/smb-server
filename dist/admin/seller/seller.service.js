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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notifications_service_1 = require("../notifications/notifications.service");
let SellerService = class SellerService {
    constructor(sellerModel, notificationService) {
        this.sellerModel = sellerModel;
        this.notificationService = notificationService;
    }
    async getSellers() {
        const sellers = await this.sellerModel.find();
        return sellers;
    }
    async addSeller(entireBody) {
        const newSeller = new this.sellerModel(entireBody);
        newSeller.save();
        this.notificationService.addNotification('Seller Added', `${entireBody.businessName} - (${entireBody.businessName})`, `Business Doc - ${entireBody.businessDoc} (${entireBody.businessDocNumber})`, null, null);
    }
};
SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Seller')),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_service_1.NotificationsService])
], SellerService);
exports.SellerService = SellerService;
//# sourceMappingURL=seller.service.js.map