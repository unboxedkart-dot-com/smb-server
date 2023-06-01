/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { EnquiryModel } from 'src/models/store-app/enquiry.model';
import { StoreNotificationModel } from 'src/models/store-app/store-notification.model';
import { StoreTokenModel } from 'src/models/store-app/token.model';
import { User } from 'src/models/user.model';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { CreateTokenDto } from './dto/create-token.dto';
export declare class StoreTokenService {
    private readonly userModel;
    private readonly productModel;
    private readonly storeTokenModel;
    private readonly enquiryModel;
    private readonly storeNotificationModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, storeTokenModel: Model<StoreTokenModel>, enquiryModel: Model<EnquiryModel>, storeNotificationModel: Model<StoreNotificationModel>);
    handleCreateToken(userId: string, body: CreateTokenDto): Promise<{
        'time in string': number;
        time2: (fractionDigits?: number) => string;
        time3: (fractionDigits?: number) => string;
        time4: (precision?: number) => string;
        time5: (locales?: string | string[], options?: Intl.NumberFormatOptions) => string;
        time6: (radix?: number) => string;
    }>;
    handleGetTokens(startDate: string, endDate: string): Promise<(import("mongoose").Document<unknown, any, StoreTokenModel> & StoreTokenModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleCreateEnquiry(userId: string, body: CreateEnquiryDto): Promise<{
        'time in string': number;
        time2: (fractionDigits?: number) => string;
        time3: (fractionDigits?: number) => string;
        time4: (precision?: number) => string;
        time5: (locales?: string | string[], options?: Intl.NumberFormatOptions) => string;
        time6: (radix?: number) => string;
    }>;
}
