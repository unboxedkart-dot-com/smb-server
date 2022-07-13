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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ServicesService = class ServicesService {
    constructor(serviceModel) {
        this.serviceModel = serviceModel;
    }
    async findOne(productCode, color) {
        console.log('queries', productCode, color);
        const products = await this.serviceModel.find({
            productCode: productCode,
            colors: { $in: [color] },
        });
        return products;
    }
    create(createServiceDto) {
        return 'This action adds a new service';
    }
    findAll() {
        return `This action returns all services`;
    }
    update(id, updateServiceDto) {
        return `This action updates a #${id} service`;
    }
    remove(id) {
        return `This action removes a #${id} service`;
    }
    async addAll() {
        await this.serviceModel.insertMany([
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'display Replacement',
                'price': 12500,
                'sellingPrice': 9500,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Battery Replacement',
                'price': 3500,
                'sellingPrice': 2200,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Charging port',
                'price': 2500,
                'sellingPrice': 1500,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Speaker ',
                'price': 2500,
                'sellingPrice': 1500,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Microphone',
                'price': 2500,
                'sellingPrice': 1500,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Volume buttons',
                'price': 2500,
                'sellingPrice': 1500,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Face Id',
                'price': 9000,
                'sellingPrice': 7000,
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Wifi Issue',
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Bluetooth Connectivity Issue',
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Network/Cellular issue',
            },
            {
                'productCode': 'apple-iphone-x',
                'colors': ['silver', 'space-grey'],
                'title': 'Water damage',
            },
        ]);
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Service')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map