import mongoose from 'mongoose';
export declare enum OrderStatuses {
    ORDERED = "ORDERED",
    ACCEPTED = "ACCEPTED",
    SHIPPED = "SHIPPED",
    READY_FOR_PICKUP = "READY FOR PICKUP",
    OUT_FOR_DELIVERY = "OUT FOR DELIVERY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare enum PaymentTypes {
    FULL = "FULL",
    PARTIAL = "PARTIAL",
    NULL = "NULL"
}
export declare enum DeliveryTypes {
    STORE_PICKUP = "STORE PICKUP",
    HOME_DELIVERY = "HOME DELIVERY"
}
export declare enum PaymentMethods {
    PAY_AT_STORE = "PAY AT STORE",
    PAY_AT_STORE_DUE = "PAT AT STORE DUE",
    CASH_ON_DELIVERY = "CASH ON DELIVERY",
    CASH_ON_DELIVERY_DUE = "CASH ON DELIVERY DUE",
    PREPAID = "PREPAID"
}
export declare const OrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Order {
    userId: string;
    orderNumber: string;
    orderDate: Date;
    updatedDate: Date;
    deliveryType: string;
    shippingDetails: any;
    pickUpDetails: any;
    userDetails: {
        name: string;
        phoneNumber: number;
        emailId: string;
    };
    paymentDetails: {
        paymentType: string;
        paymentMethod: string;
        partialPaymentId: string;
        amountPaid: number;
        amountDue: number;
        paymentIds: string[];
        isPaid: boolean;
    };
    pricingDetails: {
        billTotal: string;
        payableTotal: string;
        couponCode: string;
        couponDiscount: number;
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
