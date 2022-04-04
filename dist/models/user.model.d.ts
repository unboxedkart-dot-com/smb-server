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
        orderItems: [
            {
                productId: string;
                createdTime: Date;
                productCount: number;
            }
        ];
        deliveryAddress: any;
        couponCode: string;
        deliveryType: String;
        storeLocation: any;
    };
    personalCouponCode: string;
}
