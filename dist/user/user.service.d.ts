/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { UserPaymentDetails } from 'src/models/user_payment_details.model';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';
export declare class UserService {
    private readonly userModel;
    private readonly userPaymentDetailsModel;
    constructor(userModel: Model<User>, userPaymentDetailsModel: Model<UserPaymentDetails>);
    getUserDetails(userId: string): Promise<import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserData(userId: string): Promise<{
        purchasedItemIds: string[];
        answeredQuestionIds: string[];
    }>;
    updateUserDetails(userId: string, entireBody: UpdateUserDetailsDto): Promise<void>;
    getPaymentDetails(userId: string): Promise<import("mongoose").Document<unknown, any, UserPaymentDetails> & UserPaymentDetails & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePaymentDetails(userId: string, entireBody: UpdateUserPaymentDetailsDto): Promise<void>;
}
