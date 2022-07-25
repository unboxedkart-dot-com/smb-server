/// <reference types="multer" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { S3Service } from 'src/s3/s3.service';
import { AddProductDto } from './dto/add-product.dto';
import { AddVendorDto } from './dto/add-seller.dto';
import { SellProductDto } from './dto/sell-product.dto';
import { LocalInventoryService } from './local-inventory.service';
export declare class LocalInventoryController {
    private readonly localInventoryService;
    private readonly s3Service;
    constructor(localInventoryService: LocalInventoryService, s3Service: S3Service);
    handleGetSearchedProducts(title: string, category: string, brand: string, serialNumber: string): Promise<void>;
    addProduct(request: any, entireBody: AddProductDto): Promise<void>;
    sellProduct(request: any, entireBody: SellProductDto): Promise<void>;
    addVendor(request: any, entireBody: AddVendorDto): Promise<void>;
    handleGetVendors(): Promise<(import("mongoose").Document<unknown, any, import("../models/local_inventory/vendor.model").VendorModel> & import("../models/local_inventory/vendor.model").VendorModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleGetCustomers(): Promise<(import("mongoose").Document<unknown, any, import("../models/local_inventory/customer.model").CustomerModel> & import("../models/local_inventory/customer.model").CustomerModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getOverview(): Promise<void>;
    getSalesData(): Promise<void>;
    getAvailableInventory(title: string, category: string, brand: string, serialNumber: string): Promise<(import("mongoose").Document<unknown, any, import("../models/local_inventory/product.model").ProductModel> & import("../models/local_inventory/product.model").ProductModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getSoldInventory(startDate: string, endDate: string): Promise<(import("mongoose").Document<unknown, any, import("../models/local_inventory/product.model").ProductModel> & import("../models/local_inventory/product.model").ProductModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getVendors(): Promise<(import("mongoose").Document<unknown, any, import("../models/local_inventory/vendor.model").VendorModel> & import("../models/local_inventory/vendor.model").VendorModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleUploadPurchaseInvoice(file: Express.Multer.File, request: any, Body: any): Promise<void>;
    handleUploadOriginalInvoice(file: Express.Multer.File, request: any, Body: any): Promise<void>;
    handleUploadSellerIdProof(file: Express.Multer.File, request: any, Body: any): Promise<void>;
    getNotifications(): Promise<(import("mongoose").Document<unknown, any, import("../models/local_inventory/notification.model").NotificationModel> & import("../models/local_inventory/notification.model").NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
