import mongoose from 'mongoose';
export declare enum OrderStatuses {
    ORDERED = "ORDERED",
    ACCEPTED = "ACCEPTED",
    SHIPPED = "SHIPPED",
    OUT_FOR_DELIVERY = "OUT FOR DELIVERY",
    DELIVERED = "DELIVERED"
}
export declare enum paymentTypes {
    PAY_AT_STORE = "PAY AT STORE",
    CASH_ON_DELIVERY = "CASH ON DELIVERY",
    PREPAID = "PREPAID"
}
export declare enum DeliveryTypes {
    STORE_PICKUP = "STORE PICKUP",
    HOME_DELIVERY = "HOME DELIVERY"
}
export declare const OrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Order {
    userId: string;
    orderNumber: string;
    orderDate: Date;
    updatedDate: Date;
    paymentDetails: {
        paymentDate: string;
        paymentId: string;
        isPaid: boolean;
        billTotal: string;
        payableTotal: string;
    };
    orderStatus: string;
    orderItems: [
        {
            productId: string;
            pricePerItem: number;
            productCount: number;
            total: number;
            productDetails: {
                imageUrl: string;
                title: string;
                color: string;
                condition: string;
                brand: string;
                category: string;
            };
        }
    ];
}
