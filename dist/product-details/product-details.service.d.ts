import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
export declare class ProductDetailsService {
    private readonly productSpecsModel;
    constructor(productSpecsModel: Model<Product>);
    getProductSpecs(productId: string): Promise<any>;
    addProductSpecs(entireBody: CreateProductDetailsDto): Promise<void>;
}
