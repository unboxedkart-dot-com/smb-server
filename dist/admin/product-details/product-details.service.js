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
exports.ProductDetailsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
let ProductDetailsService = class ProductDetailsService {
    constructor(productModel, productSpecsModel, productDataModel, productImagesModel, productDescriptionModel) {
        this.productModel = productModel;
        this.productSpecsModel = productSpecsModel;
        this.productDataModel = productDataModel;
        this.productImagesModel = productImagesModel;
        this.productDescriptionModel = productDescriptionModel;
    }
    async addProductSpecs(entireBody) {
        const newProductSpecs = new this.productSpecsModel({
            'productCode': entireBody.productCode,
            'productSpecs': entireBody.productSpecs,
        });
        newProductSpecs.save();
    }
    async addProductDescription(entireBody) {
        const newProductSpecs = new this.productSpecsModel({
            productCode: entireBody.productCode,
            productSpecs: entireBody.productDescription,
        });
    }
    async addSeriesCodeToProductData() {
        await this.productDataModel.updateMany({ productCode: { $regex: /iphone-11/ } }, [{ $set: { seriesCode: 'iphone-11' } }]);
    }
    async addProductData(entireBody) {
        console.log('new entire body', entireBody);
        const newProductData = new this.productDataModel({
            productCode: entireBody.productCode,
            categoryCode: entireBody.categoryCode,
            brand: entireBody.brand,
            category: entireBody.category,
            brandCode: entireBody.brandCode,
            highlights: entireBody.highlights,
            title: entireBody.title,
            modelNumber: entireBody.modelNumber,
            modelCode: entireBody.modelCode,
            processors: entireBody.processors,
            rams: entireBody.rams,
            colors: entireBody.colors,
            storages: entireBody.storages,
        });
        newProductData.save();
    }
    async addProductImages(entireBody) {
        const productImages = new this.productImagesModel({
            productCode: entireBody.productCode,
            colorCode: entireBody.colorCode,
            count: entireBody.count,
        });
        productImages.save();
    }
    async addAllProductImages() {
        this.productImagesModel.insertMany([
            {
                productCode: 'apple-8',
                colorCode: 'silver',
                count: 4,
            },
        ]);
    }
    async addMultipleProductSpecs() {
        const newProductSpecs = await this.productSpecsModel.insertMany([
            {
                productCode: 'apple-watch-series-7',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': 'Watch Series 7',
                            'Dial Shape': 'Rectangle',
                            Size: 'Regular',
                            Touchscreen: 'Yes',
                            'Water Resistant': 'Yes',
                            'Water Resistance Depth': '50 m',
                            Usage: 'Notifier, Fitness & Outdoor',
                            'Dial Material': 'Aluminium Case',
                            'Ideal For': 'Men & Women',
                        },
                    },
                    {
                        title: 'Product Details',
                        values: {
                            Sensor: 'Blood Oxygen Sensor, Electrical Heart Sensor, Optical Heart Sensor, Altimeter, Compass, Gyroscope, Accelerometer, Ambient Light Sensor',
                            'Compatible Device': 'iPhone 6s or Later with iOS 15 or Later',
                            Notification: 'Yes',
                            'Battery Type': 'Lithium Ion',
                            'Charge Time': '90 min',
                            'Battery Life': 'Upto 18 hrs (Based on Usage)',
                            'Rechargeable Battery': 'Yes',
                            'Charger Type': 'Magnetic Charger',
                            'Other Features': 'Digital Crown with Haptic Feedback',
                        },
                    },
                    {
                        title: 'Platform And Storage Features',
                        values: {
                            'Operating System': 'watchOS 8',
                            'Compatible Operating System': 'iOS',
                            'Number of Cores': '2',
                            'Processor Name': 'S7 Dual Core Processor',
                            'Internal Memory': '32 GB',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Call Function': 'Yes',
                            Bluetooth: 'Yes',
                            'Wi-Fi': 'Yes',
                            GPS: 'Yes',
                            'Bluetooth Version': 'v5.0',
                            'Other Connectivity Features': 'Wi-Fi 802.11 b/g/n',
                        },
                    },
                    {
                        title: 'Camera And Display Features',
                        values: {
                            'Display Resolution': '396 x 484 Pixel',
                            'Display Size': '41 mm',
                            'Display Type': 'OLED Retina Display',
                        },
                    },
                    {
                        title: 'Fitness And Watch Functions',
                        values: {
                            'Calorie Count': 'Yes',
                            'Step Count': 'Yes',
                            'Heart Rate Monitor': 'Yes',
                            Altimeter: 'Yes',
                            'Other Fitness Features': 'Blood Oxygen, ECG, High and Low Heart Rate Notifications, Irregular Heart Rhythm Notification, Fall Detection',
                            'Date & Time Display': 'Yes',
                            Compass: 'Yes',
                            Calendar: 'Yes',
                            'Alarm Clock': 'Yes',
                            Language: 'English',
                        },
                    },
                    {
                        title: 'Audio And Video Features',
                        values: {
                            Speaker: 'Yes',
                            Microphone: 'Yes',
                        },
                    },
                    {
                        title: 'Dimensions',
                        values: {
                            Weight: '32 g',
                        },
                    },
                ],
            },
            {
                productCode: 'apple-watch-series-6',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': 'Watch Series 6',
                            'Dial Shape': 'Rectangle',
                            Size: 'Regular',
                            Touchscreen: 'Yes',
                            'Water Resistant': 'Yes',
                            'Water Resistance Depth': '50 m',
                            Usage: 'Fitness & Outdoor',
                            'Dial Material': 'Aluminium Case',
                            'Ideal For': 'Men & Women',
                        },
                    },
                    {
                        title: 'Product Details',
                        values: {
                            Sensor: 'Blood Oxygen Sensor, Electrical Heart Sensor, Optical Heart Sensor (2nd Gen), Altimeter, Compass, Gyroscope, Accelerometer, Ambient Light Sensor',
                            'Compatible Device': 'iPhone 6s or Later with iOS 14 or Later',
                            Notification: 'Yes',
                            'Battery Type': 'Lithium Ion',
                            'Battery Life': 'Upto 18 hours (Based on Usage)',
                            'Rechargeable Battery': 'Yes',
                            'Charger Type': 'Magnetic Charger',
                            'Other Features': 'Digital Crown with Haptic Feedback',
                        },
                    },
                    {
                        title: 'Platform And Storage Features',
                        values: {
                            'Operating System': 'watchOS 7',
                            'Compatible Operating System': 'iOS',
                            'Number of Cores': '2',
                            'Processor Name': 'S6 Dual Core Processor with W3 (Apple Wireless Chip), U1 Chip (Ultra Wideband)',
                            'Internal Memory': '32 GB',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Call Function': 'Yes',
                            Bluetooth: 'Yes',
                            'Wi-Fi': 'Yes',
                            GPS: 'Yes',
                            'Bluetooth Version': 'v5.0',
                            'Other Connectivity Features': 'Wi-Fi 802.11 b/g/n (2.4 GHz | 5 GHz)',
                        },
                    },
                    {
                        title: 'Camera And Display Features',
                        values: {
                            'Display Resolution': '324 x 394 Pixels',
                            'Display Size': '40 mm',
                            'Display Type': 'Retina Display',
                            'Other Display Features': 'Ion-X Glass Display, 1000 nits Brightness, Retina LTPO OLED Display',
                        },
                    },
                    {
                        title: 'Fitness And Watch Functions',
                        values: {
                            'Calorie Count': 'Yes',
                            'Step Count': 'Yes',
                            'Heart Rate Monitor': 'Yes',
                            Altimeter: 'Yes',
                            'Other Fitness Features': 'Blood Oxygen, ECG, High and Low Heart Rate Notifications, Irregular Heart Rhythm Notification, Fall Detection',
                            'Date & Time Display': 'Yes',
                            Compass: 'Yes',
                            Calendar: 'Yes',
                            'Alarm Clock': 'Yes',
                            Language: 'English',
                            'Number of Buttons': '1',
                            'Other Watch Functions': 'Emergency SOS, International Emergency Calling, Always-on Altimeter, Apple Pay, GymKit',
                        },
                    },
                    {
                        title: 'Audio And Video Features',
                        values: {
                            Speaker: 'Yes',
                            Microphone: 'Yes',
                        },
                    },
                    {
                        title: 'Dimensions',
                        values: {
                            Weight: '41 g',
                        },
                    },
                ],
            },
            {
                productCode: 'apple-watch-series-5',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': 'Watch Series 5',
                            'Dial Shape': 'Rectangle',
                            Size: 'Regular',
                            Touchscreen: 'Yes',
                            'Water Resistant': 'Yes',
                            'Water Resistance Depth': '50 m',
                            Usage: 'Fitness & Outdoor',
                            'Dial Material': 'Aluminium Case',
                            'Ideal For': 'Men & Women',
                        },
                    },
                    {
                        title: 'Product Details',
                        values: {
                            Sensor: 'Electrical and Optical Heart Rate Sensors, Barometric Altimeter, Accelerometer, Gyroscope, Ambient Light Sensor',
                            'Compatible Device': 'iPhone Smartphones',
                            'Battery Type': 'Lithium Ion',
                            'Battery Life': 'Upto 18 hrs (Based on Usage)',
                            'Rechargeable Battery': 'Yes',
                            'Charger Type': 'Magnetic Charger',
                            'Other Features': 'Fall Detection, Digital Crown with Haptic Feedback, GPS, GLONASS, Galileo and QZSS Support',
                        },
                    },
                    {
                        title: 'Platform And Storage Features',
                        values: {
                            Sensor: 'Electrical and Optical Heart Rate Sensors, Barometric Altimeter, Accelerometer, Gyroscope, Ambient Light Sensor',
                            'Compatible Device': 'iPhone Smartphones',
                            'Battery Type': 'Lithium Ion',
                            'Battery Life': 'Upto 18 hrs (Based on Usage)',
                            'Rechargeable Battery': 'Yes',
                            'Charger Type': 'Magnetic Charger',
                            'Other Features': 'Fall Detection, Digital Crown with Haptic Feedback, GPS, GLONASS, Galileo and QZSS Support',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Call Function': 'Yes',
                            Bluetooth: 'Yes',
                            'Wi-Fi': 'Yes',
                            GPS: 'Yes',
                            'Bluetooth Version': 'v5.0',
                            'Other Connectivity Features': 'Wi-Fi (802.11b/g/n) at 2.4 GHz',
                        },
                    },
                    {
                        title: 'Camera And Display Features',
                        values: {
                            'Display Resolution': '324 x 394 Pixels',
                            'Display Size': '40 mm',
                            'Display Type': 'OLED',
                            'Other Display Features': 'LTPO OLED Always-on Retina Display with Force Touch (Brightness - 1000 nits)',
                        },
                    },
                    {
                        title: 'Fitness And Watch Functions',
                        values: {
                            'Calorie Count': 'Yes',
                            'Step Count': 'Yes',
                            'Heart Rate Monitor': 'Yes',
                            Altimeter: 'Yes',
                            'Date & Time Display': 'Yes',
                            Compass: 'Yes',
                            Calendar: 'Yes',
                            'Alarm Clock': 'Yes',
                            Language: 'English',
                            'Number of Buttons': '1',
                        },
                    },
                    {
                        title: 'Audio And Video Features',
                        values: {
                            Speaker: 'Yes',
                            Microphone: 'Yes',
                        },
                    },
                ],
            },
            {
                productCode: 'apple-watch-series-4',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': 'Watch Series 4',
                            'Dial Shape': 'Rectangle',
                            Size: 'Regular',
                            Touchscreen: 'Yes',
                            'Water Resistant': 'Yes',
                            'Water Resistance Depth': '50 m',
                            Usage: 'Fitness & Outdoor',
                            'Dial Material': 'Aluminium Case',
                            'Ideal For': 'Men & Women',
                        },
                    },
                    {
                        title: 'Product Details',
                        values: {
                            Sensor: 'Electrical Heart Sensor, 2nd Gen Optical Heart Sensor, Barometer, Aaccelerometer, Gyroscope, Ambient Light Sensor',
                            'Compatible Device': 'iPhone 6 and Above',
                            Notification: 'Yes',
                            'Battery Type': 'Lithium Ion',
                            'Battery Life': 'Upto 18 hrs (Based on Usage)',
                            'Rechargeable Battery': 'Yes',
                            'Charger Type': 'USB Power Adapter (5 W)',
                        },
                    },
                    {
                        title: 'Platform And Storage Features',
                        values: {
                            'Operating System': 'watchOS 5',
                            'Compatible Operating System': 'iOS 12 or Above',
                            'Number of Cores': '2',
                            'Processor Name': 'S4 with 64-bit Dual Core Processor',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Call Function': 'Yes',
                            Bluetooth: 'Yes',
                            'Wi-Fi': 'Yes',
                            GPS: 'Yes',
                            'Bluetooth Version': 'v5.0',
                            'Other Connectivity Features': 'Wi-Fi (802.11b/g/n)',
                        },
                    },
                    {
                        title: 'Camera And Display Features',
                        values: {
                            'Display Resolution': '368 x 448 Pixels',
                            'Display Size': '44 mm',
                            'Display Type': 'OLED',
                            'Backlight Display': 'Yes',
                            'Scratch Resistant': 'Yes',
                            'Other Display Features': 'LTPO OLED Retina Display with Force Touch (1000 nits Brightness)',
                        },
                    },
                    {
                        title: 'Fitness And Watch Functions',
                        values: {
                            'Calorie Count': 'Yes',
                            'Step Count': 'Yes',
                            'Heart Rate Monitor': 'Yes',
                            Altimeter: 'Yes',
                            'Other Fitness Features': 'Tracks: Distance, Steps, Sleep Quality, Calories Burned, Heart Rate, Low and High Heart Rate Notifications, Fall Detection, Pace and Cadence Alerts, Yoga and Hiking Workouts',
                            'Date & Time Display': 'Yes',
                            Calendar: 'Yes',
                            'Alarm Clock': 'Yes',
                            Language: 'English',
                            'Number of Buttons': '1',
                            'Other Watch Functions': 'Digital Crown with Haptic Feedback, Customizable Watch Faces, Receive Notifications',
                        },
                    },
                    {
                        title: 'Audio And Video Features',
                        values: {
                            Speaker: 'Yes',
                        },
                    },
                ],
            },
            {
                productCode: 'apple-watch-series-3',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': 'Watch Series 3',
                            'Dial Shape': 'Rectangle',
                            Size: 'Regular',
                            Touchscreen: 'Yes',
                            'Water Resistant': 'Yes',
                            'Water Resistance Depth': '50 m',
                            Usage: 'Notifier, Fitness & Outdoor',
                            'Dial Material': 'Aluminium Case',
                            'Ideal For': 'Men & Women',
                        },
                    },
                    {
                        title: 'Product Details',
                        values: {
                            Sensor: 'Barometric Altimeter, Heart Rate Sensor, Accelerometer, Gyroscope, Ambient Light Sensor, Built-in GPS and GLONASS',
                            'Compatible Device': 'iPhone 6s or later with iOS 14 or later',
                            Notification: 'Messages, Calendar, Mail',
                            'Battery Type': 'Lithium Ion',
                            'Charge Time': '90 min',
                            'Battery Life': 'Upto 18 hours',
                            'Rechargeable Battery': 'Yes',
                        },
                    },
                    {
                        title: 'Platform And Storage Features',
                        values: {
                            'Operating System': 'watchOS 4',
                            'Compatible Operating System': 'iOS 10 and Above',
                            'Number of Cores': 'Dual Core',
                            'Processor Name': 'S3',
                            'Internal Memory': '8 GB',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Call Function': 'No',
                            Bluetooth: 'Yes',
                            'Wi-Fi': 'Yes',
                            GPS: 'Yes',
                            'Bluetooth Version': 'v4.2',
                            'Other Connectivity Features': 'Wi-Fi (802.11b/g/n 2.4 GHz)',
                        },
                    },
                    {
                        title: 'Camera And Display Features',
                        values: {
                            'Display Resolution': '272 x 340 Pixels',
                            'Display Size': '38 mm',
                            'Display Type': 'OLED Retina Display',
                            'Scratch Resistant': 'Yes',
                            'Other Display Features': 'Ion-X (Strengthened Glass), Support Force Touch',
                        },
                    },
                    {
                        title: 'Fitness And Watch Functions',
                        values: {
                            'Calorie Count': 'Yes',
                            'Step Count': 'Yes',
                            'Heart Rate Monitor': 'Yes',
                            Altimeter: 'Yes',
                            'Other Fitness Features': 'Built in Fitness Tracker: Steps Count, Distance and Calories Burned',
                            'Date & Time Display': 'Yes',
                            Calendar: 'Yes',
                            'Alarm Clock': 'Yes',
                        },
                    },
                    { title: 'Audio And Video Features', values: {} },
                    { title: 'Dimensions', values: {} },
                ],
            },
            {
                productCode: 'apple-watch-se',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': 'Apple Watch SE',
                            'Dial Shape': 'Rectangle',
                            Size: 'Regular',
                            Touchscreen: 'Yes',
                            'Water Resistant': 'Yes',
                            'Water Resistance Depth': '50 m',
                            Usage: 'Fitness & Outdoor',
                            'Dial Material': 'Aluminium Case',
                            'Ideal For': 'Men & Women',
                        },
                    },
                    {
                        title: 'Product Details',
                        values: {
                            Sensor: 'Optical Heart Sensor (2nd Gen), Altimeter, Compass, Gyroscope, Ambient Light Sensor, Accelerometer',
                            'Compatible Device': 'iPhone 6s or Later with iOS 14 or Later',
                            Notification: 'Yes',
                            'Battery Type': 'Lithium Ion',
                            'Battery Life': 'Upto 18 hours (Based on Usage)',
                            'Rechargeable Battery': 'Yes',
                            'Charger Type': 'Magnetic Charger',
                            'Other Features': 'Digital Crown with Haptic Feedback',
                        },
                    },
                    {
                        title: 'Platform And Storage Features',
                        values: {
                            'Operating System': 'watchOS 7',
                            'Compatible Operating System': 'iOS',
                            'Number of Cores': '2',
                            'Processor Name': 'S5 Dual Core Processor with W3 (Apple Wireless Chip)',
                            'Internal Memory': '32 GB',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Call Function': 'Yes',
                            Bluetooth: 'Yes',
                            'Wi-Fi': 'Yes',
                            GPS: 'Yes',
                            'Bluetooth Version': 'v5.0',
                            'Other Connectivity Features': 'Wi-Fi 802.11 b/g/n (2.4 GHz)',
                        },
                    },
                    {
                        title: 'Camera And Display Features',
                        values: {
                            'Display Resolution': '368 x 480 Pixels',
                            'Display Size': '44 mm',
                            'Display Type': 'Retina Display',
                            'Other Display Features': 'Ion-X Glass Display, 1000 nits Brightness, Retina LTPO OLED Display',
                        },
                    },
                    {
                        title: 'Fitness And Watch Functions',
                        values: {
                            'Calorie Count': 'Yes',
                            'Step Count': 'Yes',
                            'Heart Rate Monitor': 'Yes',
                            Altimeter: 'Yes',
                            'Other Fitness Features': 'High and Low Heart Rate Notifications, Irregular Heart Rhythm Notification, Fall Detection',
                            'Date & Time Display': 'Yes',
                            Compass: 'Yes',
                            Calendar: 'Yes',
                            'Alarm Clock': 'Yes',
                            Language: 'English',
                            'Number of Buttons': '1',
                            'Other Watch Functions': 'Emergency SOS, International Emergency Calling, Always-on Altimeter, Apple Pay, GymKit',
                        },
                    },
                    {
                        title: 'Audio And Video Features',
                        values: {
                            Speaker: 'Yes',
                            Microphone: 'Yes',
                        },
                    },
                    {
                        title: 'Dimensions',
                        values: { Width: '38 mm', Thickness: '10.4 mm', Weight: '36.2 g' },
                    },
                ],
            },
        ]);
    }
};
ProductDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_decorators_1.InjectModel)('Product')),
    __param(1, (0, mongoose_decorators_1.InjectModel)('ProductSpecs')),
    __param(2, (0, mongoose_decorators_1.InjectModel)('ProductData')),
    __param(3, (0, mongoose_decorators_1.InjectModel)('ProductImages')),
    __param(4, (0, mongoose_decorators_1.InjectModel)('ProductDescription')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], ProductDetailsService);
exports.ProductDetailsService = ProductDetailsService;
//# sourceMappingURL=product-details.service.js.map