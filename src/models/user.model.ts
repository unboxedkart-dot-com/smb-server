import mongoose from 'mongoose';
import { OrderSummary, OrderSummarySchema } from './order_summary.model';

export enum userRoles {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export const UserSchema = new mongoose.Schema({
  phoneNumber: { type: Number, required: true },
  userRole: {
    type: String,
    required: false,
    select: false,
    default: userRoles.USER,
  },
  name: { type: String, required: true },
  recentSearches: [
    {
      searchTerm: { type: String, required: true },
      timestamp: { type: Date, required: true, default: Date.now() },
    },
  ],
  // createdTime: { type: Date, required: true, default: Date.now() },
  createdTime: { type: String, required: true, default: Date.now().toString() },
  deviceId: { type: String, required: false },
  emailId: { type: String, required: false },
  gender: { type: String, required: false },
  lastLoggedIn: { type: Date, required: true, default: Date.now() },
  favoriteItemIds: { type: Array, default: [] },
  cartItemIds: { type: Array, default: [] },
  cartItems: { type: Array, default: [] },
  savedToLaterProducts: { type: Array, default: [] },
  orderSummary: { type: OrderSummarySchema },
  personalCouponCode: { type: String, required: false },
  purchasedItemIds: { type: Array, required: false, default: [] },
  answeredQuestionIds: { type: Array, required: false, default: [] },
});

export interface User {
  // id: string;
  name: string;
  userRole: string;
  phoneNumber: string;
  recentSearches: [
    {
      searchTerm: string;
      timestamp: Date;
    },
  ];
  createdTime: Date;
  deviceId: string;
  emailId: string;
  gender: string;
  lastLoggedIn: Date;
  favoriteItemIds: string[];
  cartItemIds: string[];
  cartItems: [
    {
      productId: string;
      createdTime: Date;
      productCount: number;
    },
  ];
  savedToLaterProducts: [
    {
      productId: string;
      createdTime: Date;
      productCount: number;
    },
  ];

  orderSummary: OrderSummary;
  s;
  personalCouponCode: string;
  purchasedItemIds: string[];
  answeredQuestionIds: string[];
}

// paymentId: { type: String, required: false },
// partialPaymentId: { type: String, required: false },
// paymentType: { type: String, required: false },
// paymentOrderId: { type: String, required: false },
// partialPaymentOrderId: { type: String, required: false },
// orderItems: { type: Array, default: [] },
// couponCode: { type: String, required: false },
// deliveryType: { type: String, required: false },
// pickUpDetails: {
//   storeLocation: { type: {}, required: false },
//   pickUpTimeStart: { type: String, required: false },
//   pickUpTimeEnd: { type: String, required: false },
//   pickUpDate: { type: String, required: false },
//   pickUpDateInString: { type: String, required: false },
//   pickUpTimeInString: { type: String, required: false },
// },
// shippingDetails: {
//   shipDate: { type: Date, required: false },
//   deliveryDate: { type: String, required: false },
//   deliveryDateInString: { type: String, required: false },
//   deliveryAddress: { type: {}, required: false },
// },
