import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsPhoneNumber } from 'class-validator';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { EnquiryModel } from 'src/models/store-app/enquiry.model';
import { StoreNotificationModel } from 'src/models/store-app/store-notification.model';
import { StoreTokenModel } from 'src/models/store-app/token.model';
import { User } from 'src/models/user.model';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class StoreTokenService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('StoreToken')
    private readonly storeTokenModel: Model<StoreTokenModel>,
    @InjectModel('StoreNotification')
    @InjectModel('StoreToken')
    private readonly enquiryModel: Model<EnquiryModel>,
    @InjectModel('StoreNotification')
    private readonly storeNotificationModel: Model<StoreNotificationModel>,
  ) {}


  async handleCreateToken(userId: string, body: CreateTokenDto) {
    const userDoc = await this.userModel.findById(userId);
    const currentTime = Date.now();
    console.log(currentTime);
    if (body.productId != null) {
      const product = await this.productModel.findById(body.productId);
      const moreDetails = {
        colorCode: product.moreDetails.colorCode,
        color: product.moreDetails.color,
        storage: product.moreDetails.storage,
        storageCode: product.moreDetails.storageCode,
        connectivityCode: product.moreDetails.connectivityCode,
        connectivity: product.moreDetails.connectivity,
      };
      console.log('current product', product);
      const newToken = new this.storeTokenModel({
        userId: userId,
        name: userDoc.name,
        phoneNumber: userDoc.phoneNumber,
        moreDetails: moreDetails,
        productId: body.productId,
        tokenNumber: body.tokenNumber,
        categoryCode: product.categoryCode,
        category: product.category,
        brandCode: product.brandCode,
        brand: product.brand,
        productCode: product.productCode,
        productTitle: product.title,
        visitType: 'post-reservation',
        timestamp: currentTime,
      });
      newToken.save();
      const newStoreNotification = new this.storeNotificationModel({
        userId: userId,
        storeName: body.storeName,
        title: `${userDoc.name} (${userDoc.phoneNumber}) visited ${body.storeName} (online)`,
        subtitle: product.title,
        tokenNumber: newToken._id,
        categoryCode: product.categoryCode,
        brandCode: product.brandCode,
        productCode: product.productCode,
        productTitle: product.title,
        storageCode: product.moreDetails.storageCode,
        connectivityCode: product.moreDetails.connectivityCode,
        dateInString: 'ss',
        timestamp: currentTime,
        moreDetails: moreDetails,
      });
      newStoreNotification.save();
    } else {
      const moreDetails = {
        colorCode: body.colorCode,
        color: body.color,
        storage: body.storage,
        storageCode: body.storageCode,
        connectivityCode: body.connectivityCode,
        connectivity: body.connectivity,
      };
      const newToken = new this.storeTokenModel({
        userId: userId,
        name: userDoc.name,
        phoneNumber: userDoc.phoneNumber,
        moreDetails: moreDetails,
        timestamp: 1682520068000,
        ...body,
      });
      await newToken.save();
      const newStoreNotification = new this.storeNotificationModel({
        userId: userId,
        storeName: body.storeName,
        title: `${userDoc.name} (${userDoc.phoneNumber}) visited ${body.storeName} (walk-in)`,
        subtitle: body.productTitle,
        tokenNumber: newToken._id,
        categoryCode: body.categoryCode,
        brandCode: body.brandCode,
        productCode: body.productCode,
        productTitle: body.productTitle,
        storageCode: body.storageCode,
        connectivityCode: body.connectivityCode,
        dateInString: 'ss',
        timestamp: currentTime,
        moreDetails: moreDetails,
      });
      newStoreNotification.save();
    }

    return {
      'time in string': Date.now(),
      'time2': Date.now().toFixed,
      'time3': Date.now().toExponential,
      'time4': Date.now().toPrecision,
      'time5': Date.now().toLocaleString,
      'time6': Date.now().toString,
    };
  }

  async handleGetTokens(startDate: string, endDate: string) {
    console.log('ranghe');
    console.log(startDate);
    console.log(endDate);
    const tokens = await this.storeTokenModel.find({
      // timestamp: { $gte: startDate, $lte: endDate },
      // isAvailable: false,
    });
    return tokens;
  }

  async handleCreateEnquiry(userId: string, body: CreateEnquiryDto) {
    const userDoc = await this.userModel.findById(userId);
    const currentTime = Date.now();
    console.log(currentTime);

    const moreDetails = {
      colorCode: body.colorCode,
      color: body.color,
      storage: body.storage,
      storageCode: body.storageCode,
      connectivityCode: body.connectivityCode,
      connectivity: body.connectivity,
    };
    const newToken = new this.storeTokenModel({
      userId: userId,
      name: userDoc.name,
      phoneNumber: userDoc.phoneNumber,
      moreDetails: moreDetails,
      timestamp: 1682520068000,
      ...body,
    });
    await newToken.save();
    const newStoreNotification = new this.storeNotificationModel({
      userId: userId,
      // storeName: body.storeName,
      // title: `${userDoc.name} (${userDoc.phoneNumber}) visited ${body.storeName} (walk-in)`,
      subtitle: body.productTitle,
      tokenNumber: newToken._id,
      categoryCode: body.categoryCode,
      brandCode: body.brandCode,
      productCode: body.productCode,
      productTitle: body.productTitle,
      storageCode: body.storageCode,
      connectivityCode: body.connectivityCode,
      dateInString: 'ss',
      timestamp: currentTime,
      moreDetails: moreDetails,
    });
    newStoreNotification.save();

    return {
      'time in string': Date.now(),
      'time2': Date.now().toFixed,
      'time3': Date.now().toExponential,
      'time4': Date.now().toPrecision,
      'time5': Date.now().toLocaleString,
      'time6': Date.now().toString,
    };
  }
}
