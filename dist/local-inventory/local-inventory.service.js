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
exports.LocalInventoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let LocalInventoryService = class LocalInventoryService {
    constructor(productModel, vendorModel, buyerModel, agentModel, customerModel, purchasedItemModel, notificationModel) {
        this.productModel = productModel;
        this.vendorModel = vendorModel;
        this.buyerModel = buyerModel;
        this.agentModel = agentModel;
        this.customerModel = customerModel;
        this.purchasedItemModel = purchasedItemModel;
        this.notificationModel = notificationModel;
    }
    async getNewSearch(title, category, brand, serialNumber) {
        let query = {};
        if (title != undefined && title != null && title != 'null') {
            const searchTerm = title.replace(/\s/g, '');
            const titleExp = new RegExp(`${searchTerm}`);
            console.log('title expression', searchTerm, titleExp);
            query = {
                searchCases: {
                    $in: [searchTerm, titleExp],
                },
            };
        }
        else {
            const productExp = new RegExp('apple-iphone');
            query = {
                categoryCode: category != undefined && category != 'null'
                    ? { $eq: category }
                    : { $exists: true },
                brandCode: brand != undefined && brand != 'null'
                    ? { $eq: brand }
                    : { $exists: true },
                serialNumber: serialNumber != undefined && serialNumber != 'null'
                    ? { $eq: serialNumber }
                    : { $exists: true },
            };
        }
    }
    async addProduct(entireBody) {
        console.log('hello', entireBody);
        entireBody.productDetails.title =
            entireBody.productDetails.title +
                ' (' +
                entireBody.productDetails.grade +
                ', ' +
                entireBody.moreDetails.color +
                (entireBody.moreDetails.storage != null
                    ? `, ${entireBody.moreDetails.storage}`
                    : ``) +
                (entireBody.moreDetails.connectivity != null
                    ? `, ${entireBody.moreDetails.connectivity}`
                    : ``) +
                (entireBody.productDetails.ram != null
                    ? `, ${entireBody.productDetails.ram}`
                    : ``) +
                (entireBody.productDetails.processor != null
                    ? `, ${entireBody.productDetails.processor}`
                    : ``) +
                ')';
        console.log(entireBody.productDetails.title);
        const newProduct = new this.productModel(entireBody);
        await newProduct.save();
        const newNotification = new this.notificationModel({
            title: `Product purchased by ${entireBody.buyingAgentDetails.name}`,
            subtitle: entireBody.productDetails.title,
            content: `purchased at ₹${entireBody.pricingDetails.buyingPrice} from ${entireBody.sellerDetails.name}`,
        });
        newNotification.save();
    }
    async sellProduct(entireBody) {
        var _a;
        console.log('sellingproduct');
        console.log(entireBody);
        await this.productModel.findByIdAndUpdate(entireBody.productId, {
            isAvailable: false,
            buyerDetails: entireBody.buyerDetails,
            sellingAgentDetails: entireBody.agentDetails,
            'pricingDetails.sellingPrice': entireBody.sellingPrice,
            saleDate: entireBody.saleDate,
            saleDateInString: entireBody.saleDateInString,
            sellingLeadSource: entireBody.buyerDetails.leadSource,
            sellingLeadSourceInformation: entireBody.buyerDetails.leadSourceInformation,
        });
        const product = await this.productModel.findById(entireBody.productId);
        console.log('new', product);
        const newNotification = new this.notificationModel({
            title: `Product Sold by ${entireBody.agentDetails.name}`,
            subtitle: product.productDetails.title,
            content: `Sold at a profit of ₹${product.pricingDetails.sellingPrice - product.pricingDetails.buyingPrice} to ${product.buyerDetails.name} (${(_a = product.buyerDetails.leadSource) !== null && _a !== void 0 ? _a : 'Own Lead'})`,
        });
        newNotification.save();
        const customer = await this.customerModel.findOne({
            phoneNumber: product.buyerDetails.phoneNumber,
        });
        const itemPurchased = new this.purchasedItemModel({
            productCode: product.productDetails.productCode,
            title: product.productDetails.title,
            brand: product.productDetails.brand,
            category: product.productDetails.category,
            color: product.moreDetails.color,
            brandCode: product.productDetails.brandCode,
            categoryCode: product.productDetails.categoryCode,
            colorCode: product.moreDetails.colorCode,
        });
        if (customer == null) {
            const newCustomer = new this.customerModel({
                name: product.buyerDetails.name,
                emailId: product.buyerDetails.emailId,
                phoneNumber: product.buyerDetails.phoneNumber,
                city: product.buyerDetails.city,
                leadSource: product.buyerDetails.leadSource,
                leadSourceInformation: product.buyerDetails.leadSourceInformation,
                itemsPurchased: [itemPurchased],
            });
            newCustomer.save();
        }
        else if (customer != null) {
            await this.customerModel.findOneAndUpdate({ phoneNumber: product.buyerDetails.phoneNumber }, { $push: { itemsPurchased: itemPurchased } });
        }
    }
    async addVendor(entireBody) {
        const newVendor = new this.vendorModel({
            name: entireBody.name,
            phoneNumber: entireBody.phoneNumber,
            alternatePhoneNumber: entireBody.alternatePhoneNumber,
            idProofDoc: entireBody.idProofDoc,
            idProofNumber: entireBody.idProofNumber,
            city: entireBody.city,
        });
        await newVendor.save();
        const newNotification = new this.notificationModel({
            title: 'Vendor added',
            subtitle: entireBody.name,
            content: 'New vendor was added',
        });
        newNotification.save();
    }
    async getAvailableInventory(title, category, brand, serialNumber) {
        let query = {};
        if (title != undefined && title != null && title != 'null') {
            const searchTerm = title.replace(/\s/g, '');
            const titleExp = new RegExp(`${searchTerm}`);
            console.log('title expression', searchTerm, titleExp);
            query = {
                'productDetails.title': titleExp,
            };
        }
        else {
            const productExp = new RegExp('apple-iphone');
            query = {
                'productDetails.categoryCode': category != undefined && category != 'null'
                    ? { $eq: category }
                    : { $exists: true },
                'productDetails.brandCode': brand != undefined && brand != 'null'
                    ? { $eq: brand }
                    : { $exists: true },
                'productDetails.serialNumber': serialNumber != undefined && serialNumber != 'null'
                    ? { $eq: serialNumber }
                    : { $exists: true },
            };
        }
        const products = await this.productModel.find(query);
        return products;
    }
    async getSoldInventory(startDate, endDate) {
        const products = await this.productModel.find({
            saleDate: { $gte: startDate, $lte: endDate },
            isAvailable: false,
        });
        return products;
    }
    async getVendors() {
        const vendors = await this.vendorModel.find();
        return vendors;
    }
    async getCustomers() {
        const vendors = await this.customerModel.find();
        return vendors;
    }
    async getNotifications() {
        const notifications = await this.notificationModel.find();
        return notifications;
    }
};
LocalInventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('Vendor')),
    __param(2, (0, mongoose_1.InjectModel)('Buyer')),
    __param(3, (0, mongoose_1.InjectModel)('Agent')),
    __param(4, (0, mongoose_1.InjectModel)('Customer')),
    __param(5, (0, mongoose_1.InjectModel)('PurchasedProduct')),
    __param(6, (0, mongoose_1.InjectModel)('Notification')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LocalInventoryService);
exports.LocalInventoryService = LocalInventoryService;
//# sourceMappingURL=local-inventory.service.js.map