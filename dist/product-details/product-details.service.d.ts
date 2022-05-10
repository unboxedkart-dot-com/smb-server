/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { ProductSpecs } from 'src/models/product-specs';
import { ProductDescription } from 'src/models/product-description';
import { AddProductSpecsDto } from './dto/add-product-specs.dto';
import { AddProductDescriptionDto } from './dto/add-product-description.dto';
import { AddProductDataDto } from './dto/add-product-data.dto';
import { ProductData } from 'src/models/product_data.model';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { ProductImages } from 'src/models/product_images.model';
export declare class ProductDetailsService {
    private readonly productModel;
    private readonly productSpecsModel;
    private readonly productDataModel;
    private readonly productImagesModel;
    private readonly productDescriptionModel;
    constructor(productModel: Model<Product>, productSpecsModel: Model<ProductSpecs>, productDataModel: Model<ProductData>, productImagesModel: Model<ProductImages>, productDescriptionModel: Model<ProductDescription>);
    getProductSpecs(productId: string): Promise<[{
        title: string;
        values: string[];
    }]>;
    getProductDescription(productId: string): Promise<string[]>;
    addProductSpecs(entireBody: AddProductSpecsDto): Promise<void>;
    addProductDescription(entireBody: AddProductDescriptionDto): Promise<void>;
    addSomething(): Promise<void>;
    addProductData(entireBody: AddProductDataDto): Promise<void>;
    getAvailableProducts(brandCode: string, categoryCode: string): Promise<(import("mongoose").Document<unknown, any, ProductData> & ProductData & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addProductImages(entireBody: AddProductImagesDto): Promise<void>;
}
