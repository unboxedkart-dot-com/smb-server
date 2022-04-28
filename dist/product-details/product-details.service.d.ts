import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { ProductSpecs } from 'src/models/product-specs';
import { ProductDescription } from 'src/models/product-description';
import { AddProductSpecsDto } from './dto/add-product-specs.dto';
import { AddProductDescriptionDto } from './dto/add-product-description.dto';
export declare class ProductDetailsService {
    private readonly productModel;
    private readonly productSpecsModel;
    private readonly productDescriptionModel;
    constructor(productModel: Model<Product>, productSpecsModel: Model<ProductSpecs>, productDescriptionModel: Model<ProductDescription>);
    getProductSpecs(productId: string): Promise<[{
        title: string;
        values: string[];
    }]>;
    getProductDescription(productId: string): Promise<string[]>;
    addProductSpecs(entireBody: AddProductSpecsDto): Promise<void>;
    addProductDescription(entireBody: AddProductDescriptionDto): Promise<void>;
}
