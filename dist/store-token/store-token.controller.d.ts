/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { StoreTokenService } from './store-token.service';
export declare class StoreTokenController {
    private readonly storeTokenService;
    constructor(storeTokenService: StoreTokenService);
    handleCreateToken(request: any, entireBody: CreateTokenDto): Promise<{
        'time in string': number;
        time2: (fractionDigits?: number) => string;
        time3: (fractionDigits?: number) => string;
        time4: (precision?: number) => string;
        time5: (locales?: string | string[], options?: Intl.NumberFormatOptions) => string;
        time6: (radix?: number) => string;
    }>;
    handleGetTokens(startDate: string, endDate: string): Promise<(import("mongoose").Document<unknown, any, import("../models/store-app/token.model").StoreTokenModel> & import("../models/store-app/token.model").StoreTokenModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleCreateEnquiry(request: any, entireBody: CreateEnquiryDto): Promise<{
        'time in string': number;
        time2: (fractionDigits?: number) => string;
        time3: (fractionDigits?: number) => string;
        time4: (precision?: number) => string;
        time5: (locales?: string | string[], options?: Intl.NumberFormatOptions) => string;
        time6: (radix?: number) => string;
    }>;
    handleGetEnquiries(startDate: string, endDate: string): Promise<(import("mongoose").Document<unknown, any, import("../models/store-app/token.model").StoreTokenModel> & import("../models/store-app/token.model").StoreTokenModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
