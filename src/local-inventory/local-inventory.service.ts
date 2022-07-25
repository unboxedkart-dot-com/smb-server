import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';
import { ProductModel } from 'src/models/local_inventory/product.model';
import { VendorModel } from 'src/models/local_inventory/vendor.model';
import { AddProductDto } from './dto/add-product.dto';
import { AddVendorDto } from './dto/add-seller.dto';
import { SellProductDto } from './dto/sell-product.dto';

@Injectable()
export class LocalInventoryService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductModel>,
    @InjectModel('Vendor') private readonly vendorModel: Model<VendorModel>,
    @InjectModel('Buyer') private readonly buyerModel: Model<BuyerModel>,
    @InjectModel('Agent') private readonly agentModel: Model<AgentModel>,
  ) {}

  async getNewSearch(
    title: string,
    category: string,
    brand: string,
    serialNumber: string,
  ) {
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
    } else {
      const productExp = new RegExp('apple-iphone');
      query = {
        categoryCode:
          category != undefined && category != 'null'
            ? { $eq: category }
            : { $exists: true },
        brandCode:
          brand != undefined && brand != 'null'
            ? { $eq: brand }
            : { $exists: true },
        serialNumber:
          serialNumber != undefined && serialNumber != 'null'
            ? { $eq: serialNumber }
            : { $exists: true },
      };
    }
    // const products = await this.productModel.find(query).exec();
    // console.log('joined product', products.length);
    // return products as Product[];
  }

  async addProduct(entireBody: AddProductDto) {
    console.log('hello', entireBody);
    const newProduct = new this.productModel(entireBody);
    await newProduct.save();
  }

  async sellProduct(entireBody: SellProductDto) {}

  async addVendor(entireBody: AddVendorDto) {
    const newVendor = new this.vendorModel({
      name: entireBody.name,
      phoneNumber: entireBody.phoneNumber,
      alternatePhoneNumber: entireBody.alternatePhoneNumber,
      idProofDoc: entireBody.idProofDoc,
      idProofNumber: entireBody.idProofNumber,
      city: entireBody.city,
    });
    await newVendor.save();
  }

  async getAvailableInventory(
    title: string,
    category: string,
    brand: string,
    serialNumber: string,
  ) {
    let query = {};
    if (title != undefined && title != null && title != 'null') {
      const searchTerm = title.replace(/\s/g, '');
      const titleExp = new RegExp(`${searchTerm}`);
      console.log('title expression', searchTerm, titleExp);
      query = {
        'productDetails.title': titleExp,
      };
    } else {
      const productExp = new RegExp('apple-iphone');
      query = {
        'productDetails.categoryCode':
          category != undefined && category != 'null'
            ? { $eq: category }
            : { $exists: true },
        'productDetails.brandCode':
          brand != undefined && brand != 'null'
            ? { $eq: brand }
            : { $exists: true },
        'productDetails.serialNumber':
          serialNumber != undefined && serialNumber != 'null'
            ? { $eq: serialNumber }
            : { $exists: true },
      };
    }
    const products = await this.productModel.find(query);
    return products;
  }

  async getSoldInventory(startDate: string, endDate: string) {
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
}
