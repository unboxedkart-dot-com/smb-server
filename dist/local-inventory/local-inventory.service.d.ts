/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';
import { ProductModel } from 'src/models/local_inventory/product.model';
import { VendorModel } from 'src/models/local_inventory/vendor.model';
import { AddProductDto } from './dto/add-product.dto';
import { AddVendorDto } from './dto/add-seller.dto';
import { SellProductDto } from './dto/sell-product.dto';
export declare class LocalInventoryService {
    private readonly productModel;
    private readonly vendorModel;
    private readonly buyerModel;
    private readonly agentModel;
    constructor(productModel: Model<ProductModel>, vendorModel: Model<VendorModel>, buyerModel: Model<BuyerModel>, agentModel: Model<AgentModel>);
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
}
