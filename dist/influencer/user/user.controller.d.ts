/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    handleGetUserDetails(request: any): Promise<import("mongoose").Document<unknown, any, import("../models/influencer.model").Influencer> & import("../models/influencer.model").Influencer & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    handleUpdateUserDetails(request: any, entireBody: UpdateUserDetailsDto): Promise<void>;
    handleGetUserData(request: any): Promise<void>;
    handleUpdatePaymentDetails(request: any, entireBody: UpdateUserPaymentDetailsDto): Promise<void>;
    handleGetPaymentDetails(request: any): Promise<import("mongoose").Document<unknown, any, import("../../user/models/user_payment_details.model").UserPaymentDetails> & import("../../user/models/user_payment_details.model").UserPaymentDetails & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
