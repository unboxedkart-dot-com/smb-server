import mongoose from 'mongoose';
import { AddressSchema } from './address.model';
import { OrderStatuses } from './order.model';
import { StoreLocation, StoreLocationSchema } from './store_location.model';

export const OrderItemSchema = new mongoose.Schema({
  deliveryType: { type: String, required: false },
  shippingDetails: {
    shipDate: { type: String, required: false },
    deliveryDate: { type: String, required: false },
    deliveryAddress: { type: AddressSchema, required: false },
    isDelivered: { type: String, required: false },
  },
  pickUpDetails: {
    pickUpDate: { type: String, required: false },
    storeLocation: { type: StoreLocationSchema, required: false },
    isPickedUp: { type: Boolean, required: false, default: false },
  },
  paymentDetails: {
    paymentDate: { type: String, required: false },
    paymentType: { type: String, required: false },
    paymentId: { type: String, required: false },
    isPaid: { type: Boolean, required: true, default: false },
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
  shippingDetails: {
    shipDate: string;
    deliveryDate: string;
    deliveryAddress: Map<any, any>;
    isDelivered: boolean;
  };
  pickUpDetails: {
    pickUpDate: Date,
    storeLocation: StoreLocation,
    isPickedUp: boolean,
  },
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
  orderDate: string;
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
}
