/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { ProductDetailsService } from './product-details.service';
export declare class ProductDetailsController {
    private readonly productDetailsService;
    constructor(productDetailsService: ProductDetailsService);
    handleGetProductSpecs(productId: string): Promise<[{
        title: string;
        values: string[];
    }]>;
    handleGetProductDescription(productId: string): Promise<string[]>;
    getAvailableProducts(brandCode: string, categoryCode: string): Promise<(import("mongoose").Document<unknown, any, import("../models/product_data.model").ProductData> & import("../models/product_data.model").ProductData & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleGetProductVariants(productCode: string): Promise<import("mongoose").Document<unknown, any, import("../models/product_data.model").ProductData> & import("../models/product_data.model").ProductData & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
