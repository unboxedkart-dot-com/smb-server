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
    addProductSpecs(entireBody: AddProductSpecsDto): Promise<void>;
    addProductDescription(entireBody: AddProductDescriptionDto): Promise<void>;
    addSeriesCodeToProductData(): Promise<void>;
    addProductData(entireBody: AddProductDataDto): Promise<void>;
    addProductImages(entireBody: AddProductImagesDto): Promise<void>;
    addAllProductImages(): Promise<void>;
    addMultipleProductSpecs(): Promise<void>;
}
