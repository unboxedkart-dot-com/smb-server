import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { use } from 'passport';
import { Favorite } from 'src/models/favorite.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel('Favorite') private readonly favoriteModel: Model<Favorite>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getFavorites(userId: string) {
    const userDoc = await this.userModel.findOne({ _id: userId }).exec();
    const favorites = userDoc.favoriteItemIds;
    if (favorites.length > 0) {
      console.log('fav', favorites);
      const products = await this.productModel.find({
        _id: { $in: favorites },
      });
      console.log(products);
      return products as Product[];
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
      console.log(userData);
    } else {
      return 'already exists';
    }
  }

  async deleteFavorite(userId: string, productId: string) {
    if (mongoose.isValidObjectId(productId)) {
      await this.favoriteModel.findOneAndDelete({
        userId: userId,
        productId: productId,
      });
      await this.userModel.updateOne(
        { _id: userId },
        {
          $pull: { favoriteItemIds: productId },
        },
      );
    } else {
      throw new NotFoundException('could not find product');
    }
  }
}
