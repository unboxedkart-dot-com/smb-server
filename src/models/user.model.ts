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
    paymentType: { type: String, required: false },
    paymentOrderId: { type: String, required: false },
    orderItems: { type: Array, default: [] },
    couponCode: { type: String, required: false },
    deliveryType: { type: String, required: false },
    pickUpDetails: {
      storeLocation: { type: {}, required: false },
      pickUpTimeStart: { type: String, required: false },
      pickUpTimeEnd: { type: String, required: false },
      pickUpDate: { type: String, required: false },
      pickUpDateInString: { type: String, required: false },
      pickUpTimeInString: { type: String, required: false },
    },
    shippingDetails: {
      shipDate: { type: Date, required: false },
      deliveryDate: { type: String, required: false },
      deliveryDateInString: { type: String, required: false },
      deliveryAddress: { type: {}, required: false },
    },
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
    paymentId: string;
    paymentOrderId: string;
    orderItems: [
      {
        productId: string;
        createdTime: Date;
        productCount: number;
      },
    ];
    couponCode: string;
    deliveryType: String;
    pickUpDetails: {
      storeLocation: any;
      pickUpTimeStart: string;
      pickUpTimeEnd: string;
      pickUpDate: string;
      pickUpDateInString: string;
      pickUpTimeInString: string;
    };
    shippingDetails: {
      shipDate: Date;
      deliveryDate: string;
      deliveryDateInString: string;
      deliveryAddress: any;
    };
  };
  personalCouponCode: string;
}
