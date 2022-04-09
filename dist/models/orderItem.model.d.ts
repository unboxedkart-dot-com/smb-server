import mongoose from 'mongoose';
import { StoreLocation } from './store_location.model';
export declare const OrderItemSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface OrderItem {
    shippingDetails: {
        shipDate: string;
        deliveryDate: string;
        deliveryAddress: Map<any, any>;
        isDelivered: boolean;
    };
    pickUpDetails: {
        pickUpDate: Date;
        storeLocation: StoreLocation;
        isPickedUp: boolean;
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
