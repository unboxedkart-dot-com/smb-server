/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { UserPaymentDetails } from 'src/user/models/user_payment_details.model';
import { Influencer } from '../models/influencer.model';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';
export declare class UserService {
    private readonly influencerModel;
    private readonly userPaymentDetailsModel;
    constructor(influencerModel: Model<Influencer>, userPaymentDetailsModel: Model<UserPaymentDetails>);
    getUserDetails(userId: string): Promise<import("mongoose").Document<unknown, any, Influencer> & Influencer & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserData(userId: string): Promise<void>;
    updateUserDetails(userId: string, entireBody: UpdateUserDetailsDto): Promise<void>;
    getPaymentDetails(userId: string): Promise<import("mongoose").Document<unknown, any, UserPaymentDetails> & UserPaymentDetails & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePaymentDetails(userId: string, entireBody: UpdateUserPaymentDetailsDto): Promise<void>;
}
