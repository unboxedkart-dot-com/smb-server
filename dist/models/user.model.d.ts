import mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface User {
    name: string;
    phoneNumber: string;
    recentSearches: [
        {
            searchTerm: string;
            timestamp: Date;
        }
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
        }
    ];
    orderSummary: {
        paymentId: string;
        paymentOrderId: string;
        orderItems: [
            {
                productId: string;
                createdTime: Date;
                productCount: number;
            }
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
