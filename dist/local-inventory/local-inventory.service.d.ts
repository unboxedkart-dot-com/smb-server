/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';
import { CustomerModel } from 'src/models/local_inventory/customer.model';
import { NotificationModel } from 'src/models/local_inventory/notification.model';
import { ProductModel } from 'src/models/local_inventory/product.model';
import { PurchasedProductModel } from 'src/models/local_inventory/purchased-item.model';
import { VendorModel } from 'src/models/local_inventory/vendor.model';
import { AddProductDto } from './dto/add-product.dto';
import { AddVendorDto } from './dto/add-seller.dto';
import { SellProductDto } from './dto/sell-product.dto';
export declare class LocalInventoryService {
    private readonly productModel;
    private readonly vendorModel;
    private readonly buyerModel;
    private readonly agentModel;
    private readonly customerModel;
    private readonly purchasedItemModel;
    private readonly notificationModel;
    constructor(productModel: Model<ProductModel>, vendorModel: Model<VendorModel>, buyerModel: Model<BuyerModel>, agentModel: Model<AgentModel>, customerModel: Model<CustomerModel>, purchasedItemModel: Model<PurchasedProductModel>, notificationModel: Model<NotificationModel>);
    getNewSearch(title: string, category: string, brand: string, serialNumber: string): Promise<void>;
    addProduct(entireBody: AddProductDto): Promise<void>;
    sellProduct(entireBody: SellProductDto): Promise<void>;
    addVendor(entireBody: AddVendorDto): Promise<void>;
    getAvailableInventory(title: string, category: string, brand: string, serialNumber: string): Promise<(import("mongoose").Document<unknown, any, ProductModel> & ProductModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getSoldInventory(startDate: string, endDate: string): Promise<(import("mongoose").Document<unknown, any, ProductModel> & ProductModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getVendors(): Promise<(import("mongoose").Document<unknown, any, VendorModel> & VendorModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCustomers(): Promise<(import("mongoose").Document<unknown, any, CustomerModel> & CustomerModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getNotifications(): Promise<(import("mongoose").Document<unknown, any, NotificationModel> & NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
