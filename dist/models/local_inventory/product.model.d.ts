import mongoose from 'mongoose';
import { AgentModel } from './agent.model';
import { BuyerModel } from './buyer.model';
import { VendorModel } from './vendor.model';
export declare const ProductSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductModel {
    productDetails: {
        description: string;
        anyProblems: string;
        warrantyStatus: boolean;
        warrantyEndDate: string;
        warrantyEndDateInString: string;
        serialNumber: string;
        imei1Number: string;
        imei2Number: string;
        category: string;
        brand: string;
        grade: string;
        categoryCode: string;
        brandCode: string;
        gradeCode: string;
        title: string;
        productCode: string;
        boxContains: string;
    };
    moreDetails: {
        ram: string;
        color: string;
        processor: string;
        ramCode: string;
        colorCode: string;
        processorCode: string;
    };
    pricingDetails: {
        buyingPrice: number;
        expectedSellingPrice: number;
        minimumSellingPrice: number;
        sellingPrice: number;
    };
    isAvailable: boolean;
    purchaseDateInString: string;
    purchaseDate: string;
    saleDate: string;
    saleDateInString: string;
    originalInvoiceUrl: string;
    purchaseInvoiceUrl: string;
    buyingLeadSource: string;
    buyingLeadSourceInformation: string;
    sellingLeadSource: string;
    sellingLeadSourceInformation: string;
    agentDetails: AgentModel;
    buyerDetails: BuyerModel;
    sellerDetails: VendorModel;
}
