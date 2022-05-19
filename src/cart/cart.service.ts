import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from 'src/models/favorite.model';
import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import mongoose from 'mongoose';
import { CartItem } from 'src/models/cart-item.model';
import { SavedToLater } from 'src/models/save_to_later.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('CartItem') private readonly cartItemModel: Model<CartItem>,
    @InjectModel('SavedToLater')
    private readonly savedToLaterModel: Model<SavedToLater>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getCartItems(userId: string) {
    const cartItemsData = [];
    //finding user doc
    const userDoc = await this.userModel.findById(userId);
    const cartItems = userDoc.cartItems;
    const cartItemIds = userDoc.cartItemIds;
    console.log('cart item', cartItemIds);
    // iterating over cart items
    if (cartItemIds.length > 0) {
      for (const item of cartItems) {
        const product = await this.productModel.findById(item.productId);
        console.log('single product', product);
        const newCartItem = {
          productId: item.productId,
          productCount: item.productCount,
          productDetails: {
            title: product.title,
            imageUrl: product.imageUrls.coverImage,
            color: product.moreDetails.color,
            brand: product.brand,
            category: product.category,
            condition: product.condition,
          },
          pricingDetails: {
            sellingPrice: product.pricing.sellingPrice,
            price: product.pricing.price,
          },
        };
        // adding product data and count to  cart items
        cartItemsData.push(newCartItem);
      }
      console.log('all', cartItemsData);
      console.log('all', cartItemsData as CartItem[]);
    }
    return cartItemsData as CartItem[];
  }

  async getSavedLaterProducts(userId: string) {
    const productsData = [];
    //finding user doc
    const userDoc = await this.userModel.findById(userId);
    const savedLaterProducts = userDoc.savedToLaterProducts;
    // iterating over cart items
    if (savedLaterProducts.length > 0) {
      for (const item of savedLaterProducts) {
        const product = await this.productModel.findById(item.productId);
        console.log('single product', product);
        const newCartItem = {
          productId: item.productId,
          productCount: item.productCount,
          productDetails: {
            title: product.title,
            imageUrl: product.imageUrls.coverImage,
            color: product.moreDetails.color,
            brand: product.brand,
            category: product.category,
            condition: product.condition,
          },
          pricingDetails: {
            sellingPrice: product.pricing.sellingPrice,
            price: product.pricing.price,
          },
        };
        // adding product data and count to  cart items
        productsData.push(newCartItem);
      }
    }
    return productsData as SavedToLater[];
  }

  async addCartItem(userId: string, productId: string) {
    const product = await this.productModel.findById(productId);
    if (product) {
      const cartItem = await this.cartItemModel.findOne({
        productId: productId,
        userId: userId,
      });
      if (!cartItem) {
        this._handleAddCartItem(userId, productId);
      } else {
        return 'already exists';
      }
    }
  }

  async addSavedToLater(userId: string, productId: string) {
    // const product = await this.productModel.findById(productId);

    this._handleAddSaveLater(userId, productId);
    // if (product) {
    //   const product = await this.savedToLaterModel.findOne({
    //     productId: productId,
    //     userId: userId,
    //   });
    //   if (!product) {

    //   } else {
    //     return 'already exists';
    //   }
    // }
  }

  async updateCartItem(
    userId: string,
    productId: string,
    productCount: number,
  ) {
    console.log('count', productCount);
    await this.cartItemModel.findOneAndUpdate(
      { productId: { $eq: productId } },
      { productCount: productCount },
    );
    await this.userModel.updateOne(
      { _id: userId, 'cartItems.productId': productId },
      {
        $set: { 'cartItems.$.productCount': productCount },
      },
    );
  }

  async deleteCartItem(userId: string, productId: string) {
    //deleting cart item from cart items collection
    await this.cartItemModel.findOneAndDelete({
      userId: userId,
      productId: productId,
    });
    // deleting cart items from user collection
    await this.userModel.updateOne(
      { _id: userId },
      {
        $pull: {
          cartItemIds: productId,
          cartItems: { productId: productId },
        },
      },
    );
    // if (mongoose.isValidObjectId(productId)) {
    // } else {
    //   throw new NotFoundException('could not find product');
    // }
  }

  async removeProductFromSaveLater(userId: string, productId: string) {
    //deleting cart item from cart items collection
    await this.savedToLaterModel.findOneAndDelete({
      userId: userId,
      productId: productId,
    });
    // deleting cart items from user collection
    await this.userModel.updateOne(
      { _id: userId },
      {
        $pull: {
          savedToLaterProducts: { productId: productId },
        },
      },
    );
  }

  async _handleAddCartItem(
    userId: string,
    productId: string,
    // productCount: number,
  ) {
    const newCartItem = new this.cartItemModel({
      userId: userId,
      productId: productId,
      // productCount: productCount,
    });
    // adding a cart item in database
    await newCartItem.save();
    // updating cart item id & cart item details in user database
    await this.userModel.updateOne(
      { _id: userId },
      {
        $push: { cartItemIds: productId, cartItems: newCartItem },
      },
    );
  }

  async _handleAddSaveLater(
    userId: string,
    productId: string,
    // productCount: number,
  ) {
    const newSaveLaterProduct = new this.savedToLaterModel({
      userId: userId,
      productId: productId,
      // productCount: productCount,
    });
    // adding a cart item in database
    await newSaveLaterProduct.save();
    // updating cart item id & cart item details in user database
    await this.userModel.updateOne(
      { _id: userId },
      {
        $push: { savedToLaterProducts: newSaveLaterProduct },
      },
    );
  }
}

// async _handleUpdateCartItem(
//   userId: string,
//   productId: string,
//   productCount: number,
// ) {
//   // update count of cart item in cart db
//   console.log('count', productCount);
//   await this.cartItemModel.updateOne(
//     { userId: userId, productId: productId },
//     {
//       productCount: productCount,
//     },
//   );
//   // update count of cart item in user db
//   await this.userModel.updateOne(
//     { _id: userId, 'cartItems.productId': productId },
//     {
//       $set: { 'cartItems.$.productCount': productCount },
//     },
//   );
// }

//   cartItems.forEach(async (doc) => {
//     const product = await this.productModel.findById(doc.productId);

//     cartItemsData.push(newCartItem);
//     console.log('single cart data', cartItemsData);
//   });
//   const products = await this.productModel.find({
//     _id: { $in: cartItemIds },
//   });
//   cartItemIds.forEach((doc) => {
//     cartItemsData.push({
//         productData : products
//     });
//   });

//   const products = await this.productModel.find({
//     _id: { $in: favorites },
//   });
//   console.log(products);

// async addCartItem(userId: string, productId: string, productCount: number) {
//   //checking product
//   console.log('count', productCount);
//   const product = await this.productModel.findById(productId);
//   if (product) {
//     const cartItem = await this.cartItemModel.findOne({
//       productId: productId,
//       userId: userId,
//     });
//     // if cart item does not exists
//     if (!cartItem) {
//       await this._handleAddCartItem(userId, productId, productCount);
//     } else {
//       await this._handleUpdateCartItem(userId, productId, productCount);
//     }
//   } else {
//     return 'product does not exists';
//   }
// }
