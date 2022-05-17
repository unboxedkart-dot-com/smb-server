import mongoose from 'mongoose';
import { OrderSummary } from './order_summary.model';
export declare enum userRoles {
    USER = "USER",
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface User {
    name: string;
    userRole: string;
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
    savedToLaterProducts: [
        {
            productId: string;
            createdTime: Date;
            productCount: number;
        }
    ];
    orderSummary: OrderSummary;
    s: any;
    personalCouponCode: string;
    purchasedItemIds: string[];
    answeredQuestionIds: string[];
}
