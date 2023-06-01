import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';
import { AddSearchedTermDto } from './dtos/add-searched-term.dto';
import { AddWishlistItemDto } from './dtos/add-wishlist-item.dto';
import { RemoveWishlistItemDto } from './dtos/remove-wishlist-item.dto';
import { AddCartItemDto } from './dtos/add-cart-item.dto';
import { RemoveCartItemDto } from './dtos/remove-cart-item.dto';
import { TrackingNotificationModel } from 'src/models/tracking-notification.model';
import { AddViewedProductDto } from './dtos/add-viewed-product.dto';
import { clickedOnNeedMoreDiscountDto } from './dtos/clicked-on-need-more-discount.dto';
import { CarouselItem } from 'src/models/carousel_item.model';

@Injectable()
export class UsageTrackingControllerService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('TrackingNotification')
    private readonly trackingNotificationModel: Model<TrackingNotificationModel>,
    @InjectModel('CarouselItem')
    private readonly carouselItemModel: Model<CarouselItem>,
  ) {}

  async getNotifications(type: String) {
    const notifications = await this.trackingNotificationModel
      .find({ type: type })
      .sort({ timestamp: -1 });
    console.log('notifications', notifications);
    return notifications as TrackingNotificationModel[];
  }

  async addSearchedItem(userId: String, data: AddSearchedTermDto) {
    const userDoc = await this.userModel.findById(userId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `Item Searched by ${userDoc.name}`,
      subtitle: data.searchTerm,
      type: 'searched-item',
    });
    newNotification.save();
  }

  async addClickedOnBuyNow(userId: String, data: AddViewedProductDto) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} (${userDoc.phoneNumber}) tried to purchase `,
      subtitle: product.title,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'clicked-on-buy-now',
    });
    newNotification.save();
  }

  async addViewedProduct(userId: String, data: AddViewedProductDto) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `Item Viewed by ${userDoc.name} - ${userDoc.phoneNumber}`,
      subtitle: product.title,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'viewed-item',
    });
    newNotification.save();
  }

  async addWishlistItem(userId: String, data: AddWishlistItemDto) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `Item added to wishlist by ${userDoc.name} - ${userDoc.phoneNumber}`,
      subtitle: product.title,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'wishlist-item',
    });
    newNotification.save();
  }

  async removeWishlistItem(userId: String, data: RemoveWishlistItemDto) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `Item removed from wishlist by ${userDoc.name} - ${userDoc.phoneNumber}`,
      subtitle: product.title,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'wishlist-item',
    });
    newNotification.save();
  }

  async addCartItem(userId: String, data: AddCartItemDto) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `Item added to Cart by ${userDoc.name} - ${userDoc.phoneNumber}`,
      subtitle: product.title,
      productId: data.productId,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'cart-item',
    });
    newNotification.save();
  }

  async removeCartItem(userId: String, data: RemoveCartItemDto) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `Item removed from Cart by ${userDoc.name} - ${userDoc.phoneNumber}`,
      subtitle: product.title,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'cart-item',
    });
    newNotification.save();
  }

  async addClickedOnCall(userId: string) {
    const userDoc = await this.userModel.findById(userId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} - ${userDoc.phoneNumber} tried to call unboxedkart`,
      type: 'clicked-on-call',
    });
    newNotification.save();
  }

  async clickedOnNeedMoreDiscount(
    userId: string,
    data: clickedOnNeedMoreDiscountDto,
  ) {
    const userDoc = await this.userModel.findById(userId);
    const product = await this.productModel.findById(data.productId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} - ${userDoc.phoneNumber} needs more discount`,
      subtitle: product.title,
      content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
      type: 'clicked-on-need-more-discount',
    });
    newNotification.save();
  }

  async KnowMoreAboutUnboxedkart(userId: string) {
    const userDoc = await this.userModel.findById(userId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} - ${userDoc.phoneNumber} wants to know more about unboxedkart`,
      type: 'know-more-about-unboxedkart',
    });
    newNotification.save();
  }

  async KnowMoreAboutStorePickup(userId: string) {
    const userDoc = await this.userModel.findById(userId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} - ${userDoc.phoneNumber} wants to know more about unboxedkart's Store Pickup`,
      type: 'know-more-about-store-pickup',
    });
    newNotification.save();
  }

  async findStores(userId: string) {
    const userDoc = await this.userModel.findById(userId);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} - ${userDoc.phoneNumber} wants to find Unboxedkart's Stores`,
      type: 'find-stores',
    });
    newNotification.save();
  }

  async handleViewedCarouselItem(userId: string, carouselId: string) {
    const userDoc = await this.userModel.findById(userId);
    const carouselItem = await this.carouselItemModel.findById(carouselId);
    console.log(carouselItem);
    const newNotification = new this.trackingNotificationModel({
      userId: userId,
      title: `${userDoc.name} - ${userDoc.phoneNumber} viewed banners (${carouselItem.placement})`,
      subtitle: `${carouselItem.productCode}`,
      type: 'viewed-carousel-item',
    });
    newNotification.save();
  }
}
