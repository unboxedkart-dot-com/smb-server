"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalInventoryModule = void 0;
const common_1 = require("@nestjs/common");
const local_inventory_service_1 = require("./local-inventory.service");
const local_inventory_controller_1 = require("./local-inventory.controller");
const mongoose_1 = require("@nestjs/mongoose");
const vendor_model_1 = require("../models/local_inventory/vendor.model");
const buyer_model_1 = require("../models/local_inventory/buyer.model");
const agent_model_1 = require("../models/local_inventory/agent.model");
const product_model_1 = require("../models/local_inventory/product.model");
const s3_module_1 = require("../s3/s3.module");
const s3_service_1 = require("../s3/s3.service");
const notification_model_1 = require("../models/local_inventory/notification.model");
const customer_model_1 = require("../models/local_inventory/customer.model");
const purchased_item_model_1 = require("../models/local_inventory/purchased-item.model");
let LocalInventoryModule = class LocalInventoryModule {
};
LocalInventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Vendor', schema: vendor_model_1.VendorSchema },
                { name: 'Buyer', schema: buyer_model_1.BuyerSchema },
                { name: 'Agent', schema: agent_model_1.AgentSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'Notification', schema: notification_model_1.NotificationSchema },
                { name: 'Customer', schema: customer_model_1.CustomerSchema },
                { name: 'PurchasedProduct', schema: purchased_item_model_1.PurchasedProductSchema },
            ], 'inventoryDb'),
            s3_module_1.S3Module,
        ],
        controllers: [local_inventory_controller_1.LocalInventoryController],
        providers: [local_inventory_service_1.LocalInventoryService, s3_service_1.S3Service],
    })
], LocalInventoryModule);
exports.LocalInventoryModule = LocalInventoryModule;
//# sourceMappingURL=local-inventory.module.js.map