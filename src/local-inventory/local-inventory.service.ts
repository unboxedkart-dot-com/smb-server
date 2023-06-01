import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

@Injectable()
export class LocalInventoryService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductModel>,
    @InjectModel('Vendor') private readonly vendorModel: Model<VendorModel>,
    @InjectModel('Buyer') private readonly buyerModel: Model<BuyerModel>,
    @InjectModel('Agent') private readonly agentModel: Model<AgentModel>,
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerModel>,
    @InjectModel('PurchasedProduct')
    private readonly purchasedItemModel: Model<PurchasedProductModel>,
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationModel>,
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
    // entireBody.productDetails.title = `${entireBody.productDetails.title} (${
    //   entireBody.moreDetails.color
    // }, ${entireBody.moreDetails.storage ?? ''},  ${
    //   entireBody.productDetails.processor ?? ''
    // },${entireBody.productDetails.ram ?? ''}, ${
    //   entireBody.productDetails.grade
    // })`;
    entireBody.productDetails.title =
      entireBody.productDetails.title +
      ' (' +
      entireBody.productDetails.grade +
      ', ' +
      entireBody.moreDetails.color +
      (entireBody.moreDetails.storage != null
        ? `, ${entireBody.moreDetails.storage}`
        : ``) +
      (entireBody.moreDetails.connectivity != null
        ? `, ${entireBody.moreDetails.connectivity}`
        : ``) +
      (entireBody.productDetails.ram != null
        ? `, ${entireBody.productDetails.ram}`
        : ``) +
      (entireBody.productDetails.processor != null
        ? `, ${entireBody.productDetails.processor}`
        : ``) +
      ')';

    console.log(entireBody.productDetails.title);
    const newProduct = new this.productModel(entireBody);
    await newProduct.save();
    const newNotification = new this.notificationModel({
      title: `Product purchased by ${entireBody.buyingAgentDetails.name}`,
      subtitle: entireBody.productDetails.title,
      content: `purchased at ₹${entireBody.pricingDetails.buyingPrice} from ${entireBody.sellerDetails.name}`,
      // timestamp: Date.now(),
    });
    newNotification.save();
  }

  async sellProduct(entireBody: SellProductDto) {
    console.log('sellingproduct');
    console.log(entireBody);
    await this.productModel.findByIdAndUpdate(entireBody.productId, {
      isAvailable: false,
      buyerDetails: entireBody.buyerDetails,
      sellingAgentDetails: entireBody.agentDetails,
      'pricingDetails.sellingPrice': entireBody.sellingPrice,
      saleDate: entireBody.saleDate,
      saleDateInString: entireBody.saleDateInString,
      sellingLeadSource: entireBody.buyerDetails.leadSource,
      sellingLeadSourceInformation:
        entireBody.buyerDetails.leadSourceInformation,
    });
    const product = await this.productModel.findById(entireBody.productId);
    console.log('new', product);
    const newNotification = new this.notificationModel({
      title: `Product Sold by ${entireBody.agentDetails.name}`,
      subtitle: product.productDetails.title,
      content: `Sold at a profit of ₹${
        product.pricingDetails.sellingPrice - product.pricingDetails.buyingPrice
      } to ${product.buyerDetails.name} (${
        product.buyerDetails.leadSource ?? 'Own Lead'
      })`,
    });
    newNotification.save();
    const customer = await this.customerModel.findOne({
      phoneNumber: product.buyerDetails.phoneNumber,
    });
    const itemPurchased = new this.purchasedItemModel({
      productCode: product.productDetails.productCode,
      title: product.productDetails.title,
      brand: product.productDetails.brand,
      category: product.productDetails.category,
      color: product.moreDetails.color,
      brandCode: product.productDetails.brandCode,
      categoryCode: product.productDetails.categoryCode,
      colorCode: product.moreDetails.colorCode,
    });
    if (customer == null) {
      const newCustomer = new this.customerModel({
        name: product.buyerDetails.name,
        emailId: product.buyerDetails.emailId,
        phoneNumber: product.buyerDetails.phoneNumber,
        city: product.buyerDetails.city,
        leadSource: product.buyerDetails.leadSource,
        leadSourceInformation: product.buyerDetails.leadSourceInformation,
        itemsPurchased: [itemPurchased],
      });
      newCustomer.save();
    } else if (customer != null) {
      await this.customerModel.findOneAndUpdate(
        { phoneNumber: product.buyerDetails.phoneNumber },
        { $push: { itemsPurchased: itemPurchased } },
      );
    }
  }

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
    const newNotification = new this.notificationModel({
      title: 'Vendor added',
      subtitle: entireBody.name,
      content: 'New vendor was added',
      // dateInString : `${Date.}`
    });
    newNotification.save();
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

  async getCustomers() {
    const vendors = await this.customerModel.find();
    return vendors;
  }

  async getNotifications() {
    const notifications = await this.notificationModel.find();
    return notifications;

    // await this.productModel.updateMany({
    //   $set : {hide : true}
    // });

    // await this.notificationModel.deleteMany();

    //   this.carouselItemModel.updateMany({
    //     $set : {routeName : }
    //   });
  }
}
