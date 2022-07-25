"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = class S3Service {
    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });
    }
    async uploadFile(file) {
        const { originalname } = file;
        await this.s3_upload(file.buffer, 'unboxedkart-india/invoices/sales', originalname, file.mimetype);
    }
    async uploadOriginalInvoice(file) {
        const { originalname } = file;
        await this.s3_upload(file.buffer, 'unboxedkart-india/inventory/invoices/original-invoices', originalname, file.mimetype);
    }
    async uploadPurchaseInvoice(file) {
        const { originalname } = file;
        await this.s3_upload(file.buffer, 'unboxedkart-india/inventory/invoices/purchase-invoices', originalname, file.mimetype);
    }
    async uploadSellerIdProof(file) {
        const { originalname } = file;
        await this.s3_upload(file.buffer, 'unboxedkart-india/inventory/id-proofs/sellers', originalname, file.mimetype);
    }
    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };
        console.log(params);
        try {
            let s3Response = await this.s3.upload(params).promise();
            console.log(s3Response);
        }
        catch (e) {
            console.log(e);
        }
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map