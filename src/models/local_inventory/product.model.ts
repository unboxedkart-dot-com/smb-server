import { bool } from 'aws-sdk/clients/signer';
import mongoose from 'mongoose';
import { AgentModel, AgentSchema } from './agent.model';
import { BuyerModel, BuyerSchema } from './buyer.model';
import { VendorModel, VendorSchema } from './vendor.model';

export const ProductSchema = new mongoose.Schema({
  productDetails: {
    description: { type: String, required: true },
    anyProblems: { type: String },
    warrantyStatus: { type: Boolean, required: false, default: false },
    warrantyEndDate: { type: String },
    warrantyEndDateInString: { type: String },
    serialNumber: { type: String, required: true },
    imei1Number: { type: String },
    imei2Number: { type: String },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    grade: { type: String, required: true },
    categoryCode: { type: String, required: true },
    brandCode: { type: String, required: true },
    gradeCode: { type: String, required: true },
    productCode: { type: String, required: true },
    title: { type: String, required: true },
    boxContains: { type: String },
  },
  moreDetails: {
    ram: { type: String },
    color: { type: String },
    storage: { type: String },
    storageCode: { type: String },
    processor: { type: String },
    ramCode: { type: String },
    colorCode: { type: String },
    processorCode: { type: String },
  },
  pricingDetails: {
    buyingPrice: { type: Number, required: true },
    expectedSellingPrice: { type: Number, required: true },
    minimumSellingPrice: { type: Number, required: true },
    sellingPrice: { type: Number },
  },
  isAvailable: { type: Boolean, default: true },
  purchaseDateInString: { type: String, required: true },
  purchaseDate: { type: String, default: Date.now().toString() },
  saleDate: { type: String },
  saleDateInString: { type: String },
  originalInvoiceUrl: { type: String },
  purchaseInvoiceUrl: { type: String },
  buyingAgentDetails: { type: AgentSchema },
  sellingAgentDetails: { type: AgentSchema },
  buyerDetails: { type: BuyerSchema },
  sellerDetails: { type: VendorSchema },
  buyingLeadSource: { type: String },
  buyingLeadSourceInformation: { type: String },
  sellingLeadSource: { type: String },
  sellingLeadSourceInformation: { type: String },
  imageUrls: { type: [String] },
});

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
  imageUrls: string[];
  agentDetails: AgentModel;
  buyerDetails: BuyerModel;
  sellerDetails: VendorModel;
}
