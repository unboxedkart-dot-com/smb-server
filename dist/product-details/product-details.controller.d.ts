/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AddProductDataDto } from './dto/add-product-data.dto';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { ProductDetailsService } from './product-details.service';
export declare class ProductDetailsController {
    private readonly productDetailsService;
    constructor(productDetailsService: ProductDetailsService);
    handleGetProductSpecs(productId: string): Promise<[{
        title: string;
        values: string[];
    }]>;
    handleGetProductDescription(productId: string): Promise<string[]>;
    handleSetProductSpecs(entireBody: CreateProductDetailsDto): Promise<void>;
    addSomething(): Promise<void>;
    addProductData(request: any, entireBody: AddProductDataDto): Promise<void>;
    getAvailableProducts(brandCode: string, categoryCode: string): Promise<(import("mongoose").Document<unknown, any, import("../models/product_data.model").ProductData> & import("../models/product_data.model").ProductData & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleAddProductImages(entireBody: AddProductImagesDto): Promise<void>;
}
