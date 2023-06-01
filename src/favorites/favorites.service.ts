import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { use } from 'passport';
import { Favorite } from 'src/models/favorite.model';
import { Product } from 'src/models/product.model';
import { TrackingNotificationModel } from 'src/models/Tracking-notification.model';
import { User } from 'src/models/user.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel('Favorite') private readonly favoriteModel: Model<Favorite>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('TrackingNotification')
    private readonly trackingNotificationModel: Model<TrackingNotificationModel>,
  ) {}

  async getFavorites(userId: string) {
    const userDoc = await this.userModel.findOne({ _id: userId }).exec();
    const ObjectId = mongoose.Types.ObjectId;
    const favorites = userDoc.favoriteItemIds;
    const favoritesIds = [];
    favorites.forEach((doc) => favoritesIds.push(new ObjectId(doc)));
    console.log('getting favorites');
    if (favorites.length > 0) {
      console.log('fav', favorites);
      const products = await this.productModel.aggregate([
        {
          $match: { _id: { $in: favoritesIds } },
        },
        {
          $lookup: {
            from: 'reviewsdatas',
            localField: 'productCode',
            foreignField: 'productCode',
            as: 'rating',
          },
        },
      ]);

      // const products = await this.productModel.find({
      //   _id: { $in: favorites },
      // });
      console.log(products);
      return products as Product[];
    } else {
      return [];
    }
  }

  async addFavorite(userId: string, productId: string) {
    const favorite = await this.favoriteModel.findOne({
      productId: productId,
      userId: userId,
    });
    if (!favorite) {
      const newFavorite = new this.favoriteModel({
        userId: userId,
        productId: productId,
      });
      await newFavorite.save();
      await this.userModel.updateOne(
        { _id: userId },
        {
          $push: { favoriteItemIds: productId },
        },
      );
      const userData = await this.userModel.findById(userId);
      const productData = await this.productModel.findById(productId);
      const newNotification = new this.trackingNotificationModel({
        userId: userId,
        title: `Favorite Added by ${userData.name} - ${userData.phoneNumber}`,
        subtitle: `${productData.title}`,
        content: `It was priced at ₹${productData.pricing.sellingPrice} (₹${productData.pricing.price})`,
        type: 'wishlist-item',
      });
      newNotification.save();
      console.log(userData);
    } else {
      return 'already exists';
    }
  }

  async deleteFavorite(userId: string, productId: string) {
    if (mongoose.isValidObjectId(productId)) {
      console.log('deleting fav');
      await this.favoriteModel.findOneAndDelete({
        userId: userId,
        productId: productId,
      });
      console.log('deleting fav 2');
      const user = await this.userModel.findByIdAndUpdate(userId, {
        $pull: { favoriteItemIds: productId },
      });
      const productData = await this.productModel.findById(productId);
      const newNotification = new this.trackingNotificationModel({
        userId: user.id,
        title: `Favorite Added by ${user.name} - ${user.phoneNumber}`,
        subtitle: `${productData.title}`,
        content: `It was priced at ₹${productData.pricing.sellingPrice} (₹${productData.pricing.price})`,
        type: 'wishlist-item',
      });
      newNotification.save();
      return {
        status: 'success',
        message: 'item deleted',
      };
    } else {
      throw new NotFoundException('could not find product');
    }
  }
}
