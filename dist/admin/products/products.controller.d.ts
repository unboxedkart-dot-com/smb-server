import { AuthService } from 'src/auth/auth.service';
import { CreateProductDto } from 'src/admin/products/dto/add-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly authService;
    constructor(productsService: ProductsService, authService: AuthService);
    removeRatings(): Promise<void>;
    handleDeleteProduct(id: string, request: any): Promise<void>;
    addProduct(request: any, entireBody: CreateProductDto): Promise<{
        data: {
            response: void;
        };
    }>;
    handleDeleteProducts(): Promise<string>;
    handleUpdateInventoryCount(count: number, request: any, productId: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
