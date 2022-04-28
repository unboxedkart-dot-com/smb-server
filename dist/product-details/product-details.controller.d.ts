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
}
