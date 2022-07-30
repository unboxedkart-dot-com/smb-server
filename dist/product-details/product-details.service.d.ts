/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { ProductDescription } from 'src/models/product-description';
import { ProductSpecs } from 'src/models/product-specs';
import { Product } from 'src/models/product.model';
import { ProductData } from 'src/models/product_data.model';
import { ProductImages } from 'src/models/product_images.model';
export declare class ProductDetailsService {
    private readonly productModel;
    private readonly productSpecsModel;
    private readonly productDataModel;
    private readonly productImagesModel;
    private readonly productDescriptionModel;
    constructor(productModel: Model<Product>, productSpecsModel: Model<ProductSpecs>, productDataModel: Model<ProductData>, productImagesModel: Model<ProductImages>, productDescriptionModel: Model<ProductDescription>);
    getProductVariants(productCode: string): Promise<import("mongoose").Document<unknown, any, ProductData> & ProductData & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getProductSpecs(productId: string): Promise<[{
        title: string;
        values: string[];
    }]>;
    getProductDescription(productId: string): Promise<string[]>;
    getAvailableProducts(brandCode: string, categoryCode: string): Promise<(import("mongoose").Document<unknown, any, ProductData> & ProductData & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
