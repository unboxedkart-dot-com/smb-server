import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  phoneNumber: { type: Number, required: true },
  name: { type: String, required: true },
  recentSearches: [
    {
      searchTerm: { type: String, required: true },
      timestamp: { type: Date, required: true, default: Date.now() },
    },
  ],
  createdTime: { type: Date, required: true, default: Date.now() },
  deviceId: { type: String, required: false },
  emailId: { type: String, required: false },
  gender: { type: String, required: true },
  lastLoggedIn: { type: Date, required: true, default: Date.now() },
  favoriteItemIds: { type: Array, default: [] },
  cartItemIds: { type: Array, default: [] },
  cartItems: { type: Array, default: [] },
  orderSummary: {
    paymentId: { type: String, required: false },
    paymentOrderId: { type: String, required: false },
    orderItems: { type: Array, default: [] },
    couponCode: { type: String, required: false },
    deliveryAddress: { type: {}, required: false },
    storeLocation: { type: {}, required: false },
    deliveryType: { type: String, required: false },
  },
  personalCouponCode: { type: String, required: false },
});

export interface User {
  // id: string;
  name: string;
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
  orderSummary: {
    paymentId : string;
    paymentOrderId: string;
    orderItems: [
      {
        productId: string;
        createdTime: Date;
        productCount: number;
      },
    ];
    deliveryAddress: any;
    couponCode: string;
    deliveryType: String;
    storeLocation: any;
  };
  personalCouponCode: string;
}
