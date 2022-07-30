/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { AddSellerDto } from './dto/add-seller.dto';
import { SellerService } from './seller.service';
export declare class SellerController {
    private readonly sellerService;
    private readonly authService;
    constructor(sellerService: SellerService, authService: AuthService);
    addProduct(request: any, entireBody: AddSellerDto): Promise<{
        data: {
            response: void;
        };
    }>;
    getProduct(): Promise<(import("mongoose").Document<unknown, any, import("../../models/admin/seller.model").SellerModel> & import("../../models/admin/seller.model").SellerModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
