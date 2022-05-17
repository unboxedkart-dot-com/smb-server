import mongoose from 'mongoose';
export declare const OrderSummarySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface OrderSummary {
    userId: string;
    orderItems: [
        {
            productId: string;
            productCount: number;
        }
    ];
    itemsCount: number;
    couponCode: string;
    couponDiscount: number;
    deliveryType: string;
    shippingDetails: {
        shipDate: Date;
        expectedDeliveryDate: Date;
        expectedDeliveryDateInString: string;
        deliveryDate: string;
        deliveryDateInString: string;
        deliveryAddress: any;
    };
    pickUpDetails: {
        storeLocation: any;
        pickUpTimeStart: string;
        pickUpTimeEnd: string;
        pickUpDate: string;
        pickUpDateInString: string;
        pickUpTimeInString: string;
    };
    paymentType: string;
    paymentMethod: string;
    paymentId: string;
    partialPaymentId: string;
    paymentOrderId: string;
    partialPaymentOrderId: string;
    isActive: boolean;
    paymentAmount: number;
    partialPaymentAmount: number;
    orderNumber: string;
}
