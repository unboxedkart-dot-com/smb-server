import mongoose from 'mongoose';
export declare const ItemPurchasedUsersSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ItemPurchasedUser {
    productId: string;
    users: [
        {
            userId: String;
            userName: String;
            timestamp: Date;
            phoneNumber: number;
            emailId: string;
        }
    ];
    userIds: [];
}
