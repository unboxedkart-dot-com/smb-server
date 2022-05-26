import { VariantsService } from './variants.service';
export declare class VariantsController {
    private readonly variantsService;
    constructor(variantsService: VariantsService);
    handleAddVariantsData(): Promise<void>;
    handleGetProductVariants(productCode: string): Promise<void>;
}
