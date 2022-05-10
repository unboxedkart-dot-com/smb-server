import mongoose from 'mongoose';
import { StoreLocation } from './store_location.model';
export declare const OrderItemSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
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
