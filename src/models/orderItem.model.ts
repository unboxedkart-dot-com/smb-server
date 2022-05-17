import mongoose from 'mongoose';
import { AddressSchema } from './address.model';
import { OrderStatuses } from './order.model';
import { StoreLocation, StoreLocationSchema } from './store_location.model';

export const OrderItemSchema = new mongoose.Schema({
  deliveryType: { type: String, required: false },
  userId: { type: String, required: true },
  userDetails: {
    phoneNumber: { type: String, required: true },
    userName: { type: String, required: true },
    emailId: { type: String, required: true },
  },
  isDelivered: { type: Boolean, required: false, default: false },
  deliveryTimeStamp: { type: Date, required: false },
  shippingDetails: {
    shipDate: { type: String, required: false },
    expectedDeliveryDate: { type: Date, required: false },
    expectedDeliveryDateInString: { type: String, required: false },
    deliveryDate: { type: String, required: false },
    deliveryDateInString: { type: String, required: false },
    deliveryAddress: { type: AddressSchema, required: false },
    isDelivered: { type: String, required: false, default: false },
  },
  pickUpDetails: {
    pickUpDate: { type: String, required: false },
    storeLocation: { type: StoreLocationSchema, required: false },
    isPickedUp: { type: Boolean, required: false, default: false },
    pickUpTimeStart: { type: String, required: false },
    pickUpTimeEnd: { type: String, required: false },
    pickUpTimeInString: { type: String, required: false },
    pickUpDateInString: { type: String, required: false },
  },
  paymentDetails: {
    paymentType: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    partialPaymentId: { type: String, required: false },
    isPaid: { type: Boolean, required: true, default: false },
    amountPaid: { type: Number, required: true, default: 0 },
    amountDue: { type: Number, required: true },
    paymentDate: { type: String, required: false },
    paymentId: { type: String, required: false },
  },
  pricingDetails: {
    billTotal: { type: Number, required: true },
    payableTotal: { type: Number, required: true },
    couponCode: { type: String, required: false },
    couponDiscount: { type: Number, required: false },
  },
  orderNumber: { type: String, required: true },
  orderDate: { type: Date, required: true, default: Date.now() },
  updatedDate: { type: Date, required: false },
  orderStatus: { type: String, required: true, default: OrderStatuses.ORDERED },
  productDetails: {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, required: false },
    condition: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
  },
  orderDetails: {
    productId: { type: String, required: true },
    pricePerItem: { type: Number, required: true },
    productCount: { type: Number, required: true },
    // total: { type: Number, required: true },
  },
});

export interface OrderItem {
  deliveryType: string;
  userId: string;
  userDetails: {
    emailId: string;
    userName: string;
    phoneNumber: string;
  };
  shippingDetails: {
    shipDate: string;
    deliveryDate: string;
    deliveryDateInString: string;
    deliveryAddress: Map<any, any>;
    isDelivered: boolean;
  };
  pickUpDetails: {
    pickUpDate: Date;
    storeLocation: StoreLocation;
    isPickedUp: boolean;
    pickUpTimeStart: Date;
    pickUpTimeEnd: Date;
    pickUpTimeInString: string;
    pickUpDateInString: string;
  };
  paymentDetails: {
    paymentId: string;
    paymentDate: Date;
    isPaid: boolean;
    paymentType: String;
  };
  pricingDetails: {
    billTotal: number;
    couponCode: string;
    couponDiscount: number;
    payableAmount: number;
  };
  orderNumber: string;
  orderDate: Date;
  timestamp: string;
  updatedDate: string;
  orderStatus: string;
  productDetails: {
    imageUrl: string;
    title: string;
    color: string;
    condition: string;
    brand: string;
    category: string;
  };
  orderDetails: {
    productId: string;
    pricePerItem: number;
    productCount: number;
  };
  deliveryTimeStamp: Date;
}
