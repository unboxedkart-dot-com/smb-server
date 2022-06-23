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
    async getProductVariants(productCode) {
        const variants = await this.productDataModel.findOne({
            productCode: productCode,
        });
        return variants;
    }
    async getProductSpecs(productId) {
        console.log('goevb product id', productId);
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(productId);
            console.log(product);
            if (product != null) {
                console.log('product exists');
                const productSpecs = await this.productSpecsModel.findOne({
                    productCode: product.productCode,
                }, { _id: 0, productSpecs: 1 });
                return productSpecs.productSpecs;
            }
            else {
                console.log('product not exists');
                throw new common_1.NotFoundException('could not find the product');
            }
        }
        else {
            throw new common_1.NotFoundException('product id is not valid');
        }
    }
    async getProductDescription(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productDescriptionModel.findById(productId);
            const productDetails = await this.productDescriptionModel.findOne({
                productCode: product.productCode,
            }, { _id: 0, productSpecs: 1 });
            return productDetails.productDescription;
        }
        else {
            throw new common_1.NotFoundException('product id is not valid');
        }
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
    async addSomething() { }
    async addSeriesCodeToProductData() {
        await this.productDataModel.updateMany({ productCode: { $regex: /iphone-11/ } }, [{ $set: { seriesCode: 'iphone-11' } }]);
        await this.productDataModel.updateMany({ productCode: { $regex: /iphone-x/ } }, [{ $set: { seriesCode: 'iphone-x' } }]);
        await this.productDataModel.updateMany({ productCode: { $regex: /iphone-8/ } }, [{ $set: { seriesCode: 'iphone-8' } }]);
        await this.productDataModel.updateMany({ productCode: { $regex: /iphone-7/ } }, [{ $set: { seriesCode: 'iphone-7' } }]);
        await this.productDataModel.updateMany({ productCode: { $regex: /iphone-6/ } }, [{ $set: { seriesCode: 'iphone-6' } }]);
    }
    async addMoreProductData() {
        this.productDataModel.insertMany([
            {
                'productCode': 'apple-iphone-13',
                'colorCode': 'red',
                'count': 6,
            },
            {
                'productCode': 'apple-iphone-13',
                'colorCode': 'green',
                'count': 6,
            },
            {
                'productCode': 'apple-iphone-13',
                'colorCode': 'midnight',
                'count': 6,
            },
            {
                'productCode': 'apple-iphone-13',
                'colorCode': 'starlight',
                'count': 6,
            },
            {
                'productCode': 'apple-iphone-13',
                'colorCode': 'pink',
                'count': 6,
            },
            {
                'productCode': 'apple-iphone-13',
                'colorCode': 'blue',
                'count': 6,
            },
        ]);
    }
    async addMoreProductImages() {
        await this.productImagesModel.insertMany([
            {
                'productCode': 'oneplus-8',
                'colorCode': 'glacial-green',
                'count': 5,
            },
            {
                'productCode': 'oneplus-8',
                'colorCode': 'onyn-black',
                'count': 3,
            },
            {
                'productCode': 'oneplus-8',
                'colorCode': 'interstellar-glow',
                'count': 5,
            },
            {
                'productCode': 'oneplus-8-pro',
                'colorCode': 'glacial-green',
                'count': 5,
            },
            {
                'productCode': 'oneplus-8-pro',
                'colorCode': 'onyn-black',
                'count': 8,
            },
            {
                'productCode': 'oneplus-8-pro',
                'colorCode': 'ultramarine-blue',
                'count': 5,
            },
            {
                'productCode': 'oneplus-8t',
                'colorCode': 'aquamarine-green',
                'count': 7,
            },
            {
                'productCode': 'oneplus-8t',
                'colorCode': 'lunar-silver',
                'count': 6,
            },
            {
                'productCode': 'oneplus-9',
                'colorCode': 'arctic-sky',
                'count': 6,
            },
            {
                'productCode': 'oneplus-9',
                'colorCode': 'astral-black',
                'count': 7,
            },
            {
                'productCode': 'oneplus-9',
                'colorCode': 'winter-mist',
                'count': 7,
            },
            {
                'productCode': 'oneplus-9-pro',
                'colorCode': 'pine-green',
                'count': 4,
            },
            {
                'productCode': 'oneplus-9-pro',
                'colorCode': 'stellar-black',
                'count': 4,
            },
            {
                'productCode': 'oneplus-9-pro',
                'colorCode': 'morning-mist',
                'count': 5,
            },
            {
                'productCode': 'oneplus-9r',
                'colorCode': 'carbon-black',
                'count': 4,
            },
            {
                'productCode': 'oneplus-9r',
                'colorCode': 'lake-blue',
                'count': 3,
            },
            {
                'productCode': 'oneplus-10-pro',
                'colorCode': 'emerald-forest',
                'count': 4,
            },
            {
                'productCode': 'oneplus-10-pro',
                'colorCode': 'volcanic-black',
                'count': 5,
            },
            {
                'productCode': 'oneplus-10r',
                'colorCode': 'forest-green',
                'count': 5,
            },
            {
                'productCode': 'oneplus-10r',
                'colorCode': 'sierra-black',
                'count': 5,
            },
        ]);
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
    async getAvailableProducts(brandCode, categoryCode) {
        console.log('given data', brandCode, categoryCode);
        const products = await this.productDataModel.find({
            brandCode: brandCode,
            categoryCode: categoryCode,
        });
        return products;
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
    async addManySpecs() {
        await this.productSpecsModel.insertMany([
            {
                productCode: 'oneplus-7',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': '7 Pro',
                            Color: 'Mirror Grey',
                            'Browse Type': 'Smartphones',
                            'SIM Type': 'Dual Sim',
                            'Hybrid Sim Slot': 'Yes',
                            Touchscreen: 'Yes',
                            'OTG Compatible': 'Yes',
                            'Quick Charging': 'Yes',
                        },
                    },
                    {
                        title: 'Display Features',
                        values: {
                            'Display Size': '16.94 cm (6.67 inch)',
                            Resolution: '3120 x 1440 Pixels',
                            'HD Game Support': 'Yes',
                        },
                    },
                    {
                        title: 'Os & Processor Features',
                        values: {
                            'Processor Core': 'Octa Core',
                            'Primary Clock Speed': '2.8 GHz',
                            'Secondary Clock Speed': '1.2 GHz',
                        },
                    },
                    {
                        title: 'Memory & Storage Features',
                        values: {
                            'Internal Storage': '128 GB',
                            RAM: '6 GB',
                            'Memory Card Slot Type': 'Hybrid Slot',
                        },
                    },
                    {
                        title: 'Camera Features',
                        values: {
                            'Primary Camera Available': 'Yes',
                            'Primary Camera': '48 MP + 8 MP + 16 MP',
                            'Primary Camera Features': 'UltraShot, Nightscape, Studio Lighting, Portrait, Pro Mode, Panorama, HDR, AI Scene Detection, RAW Image',
                            'Optical Zoom': 'Yes',
                            'Secondary Camera Available': 'Yes',
                            'Secondary Camera': '16MP Front Camera',
                            'Secondary Camera Features': 'Face Unlock, HDR, Screen Flash, Face Retouching, Pop up camera',
                            Flash: 'Front & Back Flash',
                            'HD Recording': 'Yes',
                            'Full HD Recording': 'Yes',
                            'Video Recording': 'Yes',
                            'Image Editor': 'Yes',
                            'Dual Camera Lens': 'Primary Camera',
                        },
                    },
                    {
                        title: 'Call Features',
                        values: {
                            'Call Wait/Hold': 'Yes',
                            'Conference Call': 'Yes',
                            'Hands Free': 'Yes',
                            'Video Call Support': 'Yes',
                            'Call Divert': 'Yes',
                            'Phone Book': 'Yes',
                            'Call Timer': 'Yes',
                            'Speaker Phone': 'Yes',
                            'Speed Dialing': 'Yes',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Network Type': '4G VOLTE',
                            'Supported Networks': '4G LTE',
                            '3G': 'Yes',
                            GPRS: 'Yes',
                            'Micro USB Port': 'Yes',
                            'Mini USB Port': 'Yes',
                            'Bluetooth Support': 'Yes',
                            'Bluetooth Version': '5',
                            'Wi-Fi': 'Yes',
                            'Wi-Fi Version': '802.11 a/b/g/n/ac',
                            'Wi-Fi Hotspot': 'Yes',
                            'Mini HDMI Port': 'Yes',
                            'TV Out': 'Yes',
                            Infrared: 'Yes',
                        },
                    },
                    {
                        title: 'Other Details',
                        values: {
                            Smartphone: 'Yes',
                            'Touchscreen Type': '6.67 inches(The corners of the screen are within a standard rectangle. Measured diagonally, the screen size is 6.67 inches in the full rectangle and 6.46 inches accounting for the rounded corners.)',
                            'SIM Size': 'nano',
                            'Keypad Type': 'QWERTY',
                            'Java Application': 'Yes',
                            'Removable Battery': 'No',
                            'JAVA Support': 'Yes',
                            Keypad: 'No',
                            'Voice Input': 'Yes',
                            'Graphics PPI': '250 ppi',
                            Sensors: 'In-display Fingerprint Sensor, Accelerometer, Electronic Compass, Gyroscope, Ambient Light Sensor, Proximity Sensor, Sensor Core, Laser Sensor',
                            'Other Features': 'Support sRGB, Display P3 Video Enhancer Reading Mode Night Mode In-display Fingerprint Face Unlock Dual stereo speakers Noise cancellation support Dolby Atmos® Gestures and on-screen navigation support Alert Slider',
                            'GPS Type': 'L1+L5 Dual Band',
                        },
                    },
                    {
                        title: 'Multimedia Features',
                        values: {
                            'Audio Formats': 'Playback: MP3, AAC, AAC+, WMA, AMR-NB, AMR-WB, WAV, FLAC, APE, OGG, MID, M4A, IMY, AC3, EAC3, EAC3-JOC, AC4 Recording: WAV, AAC, AMR',
                            'Video Formats': 'Playback: MKV, MOV, MP4, H.265(HEVC), AVI, WMV, TS, 3GP, FLV, WEBM Recording: MP4',
                        },
                    },
                    {
                        title: 'Battery & Power Features',
                        values: {
                            'Battery Capacity': '4000 mAh',
                            'Battery Type': 'lithium-ion',
                        },
                    },
                    {
                        title: 'Dimensions',
                        values: {
                            Width: '75.9 mm',
                            Height: '162.6 mm',
                            Depth: '8.8 mm',
                            Weight: '206 g',
                        },
                    },
                ],
            },
            {
                productCode: 'oneplus-7t',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': '7T',
                            'Browse Type': 'Smartphones',
                            'SIM Type': 'Dual Sim',
                            'Hybrid Sim Slot': 'No',
                            Touchscreen: 'Yes',
                            'OTG Compatible': 'Yes',
                            'Quick Charging': 'Yes',
                        },
                    },
                    {
                        title: 'Display Features',
                        values: {
                            'Display Size': '16.64 cm (6.55 inch)',
                            Resolution: '2400 x 1080Pixels',
                            GPU: 'Adreno 640',
                            'Other Display Features': 'The OnePlus 7T’s smooth 90 Hz refresh rate is enhanced by over 370 optimizations in OxygenOS for seamless visuals and ultra-responsive touch design. Once you experience the smoothness of Fluid Display, you’ll never settle for anything less. Binge all your favorites in jaw-dropping clarity with HDR playback on Netflix, YouTube, and Amazon Prime Video. HDR10+ produces deeper blacks, brighter whites, and more true-to-life visuals for stunning movies, games, and photos. Experience more immersive entertainment, anytime, anywhere. Improved with new sensors and algorithms, our next-generation fingerprint reader is more accurate and more secure. Simply tap on the display to unlock the OnePlus 7T in an instant. In direct sunlight, an astonishing 1,000 nits of brightness ensures that everything is clear and vivid. In the dark, TÜV-certified blue-light reduction allows for safer, more comfortable nighttime reading. It’s the smartphone display that’s designed to go anywhere.',
                        },
                    },
                    {
                        title: 'Processor Features',
                        values: {
                            'Processor Type': 'Qualcomm® Snapdragon™ 855 Plus',
                            'Processor Core': 'Octa Core',
                            'Primary Clock Speed': '2.9 GHz',
                            'Operating Frequency': '855',
                        },
                    },
                    {
                        title: 'Camera Features',
                        values: {
                            'Primary Camera Available': 'Yes',
                            'Primary Camera': '48 MP + 12 MP + 16 MP',
                            'Primary Camera Features': 'Ultra wide angle : When shooting photos or videos, switch over to the ultra wide angle camera at the press of a button to instantly widen your frame to a dramatic 117° field of view. Even up close, effortlessly capture large group shots and sprawling landscapes. Nightscape : Available on both the main camera and the ultra wide angle camera, Nightscape mode combines information from multiple frames in varying exposures to produce a wider dynamic range. The result? Bright, clear, dramatic photos—even in surprisingly dark environments. UltraShot Engine : Optimized with our intelligent photography engine, the OnePlus 7T takes breathtaking photos, even in difficult lighting. From backlit portraits to sunsets at dusk, capture it all in remarkable clarity.',
                            'Optical Zoom': 'Yes',
                            'Secondary Camera Available': 'Yes',
                            'Secondary Camera': '16MP Front Camera',
                            'Secondary Camera Features': 'Front camera : The OnePlus 7T’s 16 MP front-facing camera has Portrait mode built right in for more impressive selfies, while EIS stabilization keeps videos smooth and steady when streaming or video chatting.',
                            Flash: 'Back Flash',
                            'Dual Camera Lens': 'Primary Camera',
                        },
                    },
                    {
                        title: 'Call Features',
                        values: {
                            'Call Wait/Hold': 'Yes',
                            'Conference Call': 'Yes',
                            'Video Call Support': 'Yes',
                            'Call Divert': 'Yes',
                            'Phone Book': 'Yes',
                            'Call Timer': 'Yes',
                            'Speaker Phone': 'Yes',
                            'Speed Dialing': 'Yes',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Network Type': '4G, 3G, 2G',
                            'Supported Networks': '4G LTE, GSM',
                            'Wi-Fi': 'Yes',
                            'Wi-Fi Version': '802.11 a/b/g/n/ac',
                            'Wi-Fi Hotspot': 'Yes',
                        },
                    },
                    {
                        title: 'Other Details',
                        values: {
                            Smartphone: 'Yes',
                            'SIM Size': 'Nano',
                            'Keypad Type': 'QWERTY',
                            'Social Networking Phone': 'Yes',
                            'Instant Message': 'Yes',
                            'Removable Battery': 'No',
                            SMS: 'Yes',
                            Keypad: 'No',
                            'Voice Input': 'Yes',
                            'Graphics PPI': '640 ppi',
                            'Predictive Text Input': 'Yes',
                            'SIM Access': 'dual-standby',
                            Sensors: 'Accelerometer,Ambient Light,Proximity',
                        },
                    },
                    {
                        title: 'Battery & Power Features',
                        values: {
                            'UltraShot, Nightscape, Portrait, Pro Mode, Panorama, HDR, AI Scene Detection, RAW Image': 'Multimedia Features',
                            'Audio Formats': 'MP3, AAC, AAC+, WMA, AMR-NB, AMR-WB, WAV, FLAC, APE, OGG, MID, M4A, IMY, AC3, EAC3, EAC3-JOC, AC4',
                            'Video Formats': 'MKV, MOV, MP4, H.265(HEVC), AVI, WMV, TS, 3GP, FLV, WEBM',
                        },
                    },
                    {
                        title: 'Dimensions',
                        values: {
                            Width: '7.4 mm',
                            Height: '16.1 mm',
                            Depth: '0.8 mm',
                            Weight: '190 g',
                        },
                    },
                ],
            },
            {
                productCode: 'oneplus-8t',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': '8T 5G',
                            Color: 'Aquamarine Green',
                            'Browse Type': 'Smartphones',
                            'SIM Type': 'Dual Sim',
                            'Hybrid Sim Slot': 'Yes',
                            Touchscreen: 'Yes',
                            'OTG Compatible': 'Yes',
                        },
                    },
                    {
                        title: 'Display Features',
                        values: {
                            'Display Size': '16.64 cm (6.55 inch)',
                            Resolution: '2400 x 1080 pixel',
                        },
                    },
                    {
                        title: 'Os & Processor Features',
                        values: {
                            'Operating System': 'Android Q 11',
                            'Processor Core': 'Dual Core',
                            'Primary Clock Speed': '2.4 GHz',
                        },
                    },
                    {
                        title: 'emory & Storage Features',
                        values: {
                            'Internal Storage': '128 GB',
                            RAM: '8 GB',
                        },
                    },
                    {
                        title: 'Camera Features',
                        values: {
                            'Primary Camera': '48MP Rear Camera',
                            'Dual Camera Lens': 'Primary Camera',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Network Type': '5G',
                            'Supported Networks': '4G LTE, 5G, CDMA, GSM',
                        },
                    },
                    {
                        title: 'Battery & Power Features',
                        values: {
                            'Battery Capacity': '4500 mAh',
                        },
                    },
                ],
            },
            {
                productCode: 'oneplus-9',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': '9 5G',
                            Color: 'Arctic Sky',
                            'Browse Type': 'Smartphones',
                            'SIM Type': 'Dual Sim',
                            'Hybrid Sim Slot': 'Yes',
                            Touchscreen: 'Yes',
                            'OTG Compatible': 'Yes',
                        },
                    },
                    {
                        title: 'Display Features',
                        values: {
                            'Display Size': '16.64 cm (6.55 inch)',
                            Resolution: '2400 x 1080 pixel',
                        },
                    },
                    {
                        title: 'Os & Processor Features',
                        values: {
                            'Operating System': 'Android Q 11',
                            'Processor Core': 'Dual Core',
                            'Primary Clock Speed': '2.4 GHz',
                        },
                    },
                    {
                        title: 'emory & Storage Features',
                        values: {
                            'Internal Storage': '128 GB',
                            RAM: '8 GB',
                        },
                    },
                    {
                        title: 'Camera Features',
                        values: {
                            'Primary Camera': '48MP Rear Camera',
                            'Dual Camera Lens': 'Primary Camera',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Network Type': '5G',
                            'Supported Networks': 'CDMA, GSM, 4G LTE, 5G',
                        },
                    },
                    {
                        title: 'Battery & Power Features',
                        values: {
                            'Battery Capacity': '4500 mAh',
                        },
                    },
                ],
            },
            {
                productCode: 'oneplus-9rt',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': '9RT 5G',
                            Color: 'Carbon Black',
                            'Browse Type': 'Smartphones',
                            'SIM Type': 'Dual Sim',
                            'Hybrid Sim Slot': 'Yes',
                            Touchscreen: 'Yes',
                            'OTG Compatible': 'Yes',
                        },
                    },
                    {
                        title: 'Display Features',
                        values: {
                            'Display Size': '16.81 cm (6.62 inch)',
                            Resolution: '1080 x 2400 pixel',
                        },
                    },
                    {
                        title: 'Os & Processor Features',
                        values: {
                            'Operating System': 'Android Q 11',
                            'Processor Core': 'Dual Core',
                            'Primary Clock Speed': '2.4 GHz',
                        },
                    },
                    {
                        title: 'Camera Features',
                        values: {
                            'Primary Camera': '50MP Rear Camera',
                            'Dual Camera Lens': 'Primary Camera',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Network Type': '5G',
                            'Supported Networks': 'CDMA, GSM, 4G LTE, 5G',
                        },
                    },
                    {
                        title: 'Battery & Power Features',
                        values: { 'Battery Capacity': '4500 mAh' },
                    },
                ],
            },
            {
                productCode: 'oneplus-10r',
                productSpecs: [
                    {
                        title: 'General',
                        values: {
                            'Model Name': '10R 5G',
                            Color: 'Sierra Black',
                            'Browse Type': 'Smartphones',
                            'SIM Type': 'Dual Sim',
                            'Hybrid Sim Slot': 'No',
                            Touchscreen: 'Yes',
                            'OTG Compatible': 'Yes',
                            'Quick Charging': 'Yes',
                        },
                    },
                    {
                        title: 'Display Features',
                        values: {
                            'Display Size': '17.02 cm (6.7 inch)',
                            Resolution: '2400 x 1080 pixel',
                        },
                    },
                    {
                        title: 'Os & Processor Features',
                        values: {
                            'Operating System': 'Android Android 12',
                            'Processor Core': 'Octa Core',
                            'Primary Clock Speed': '2.2 GHz',
                        },
                    },
                    {
                        title: 'Memory & Storage Features',
                        values: {
                            'Internal Storage': '128 GB',
                            RAM: '8 GB',
                            'Memory Card Slot Type': 'Dedicated Slot',
                        },
                    },
                    {
                        title: 'Camera Features',
                        values: {
                            'Primary Camera Available': 'Yes',
                            'Primary Camera': '50MP Rear Camera',
                            'Primary Camera Features': '50MP+8MP+2MP',
                            'Secondary Camera Available': 'Yes',
                            'Secondary Camera Features': '16MP',
                            Flash: 'Yes',
                            'Dual Camera Lens': 'Primary Camera',
                        },
                    },
                    {
                        title: 'Connectivity Features',
                        values: {
                            'Network Type': '5G',
                            'Supported Networks': '5G',
                        },
                    },
                    {
                        title: 'Battery & Power Features',
                        values: {
                            'Battery Capacity': '5000 mAh',
                        },
                    },
                ],
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