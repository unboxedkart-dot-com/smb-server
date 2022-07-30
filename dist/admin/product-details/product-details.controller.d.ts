import { AddProductDataDto } from './dto/add-product-data.dto';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { ProductDetailsService } from './product-details.service';
export declare class ProductDetailsController {
    private readonly productDetailsService;
    constructor(productDetailsService: ProductDetailsService);
    handleSetProductSpecs(entireBody: CreateProductDetailsDto): Promise<void>;
    modifyProductData(): Promise<void>;
    addProductData(request: any, entireBody: AddProductDataDto): Promise<void>;
    handleAddProductImages(entireBody: AddProductImagesDto): Promise<void>;
    handleAddManySpecs(): Promise<void>;
}
