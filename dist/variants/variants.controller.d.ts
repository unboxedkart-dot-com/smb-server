/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { VariantsService } from './variants.service';
export declare class VariantsController {
    private readonly variantsService;
    constructor(variantsService: VariantsService);
    handleAddVariantsData(): Promise<void>;
    handleGetProductVariants(productCode: string): Promise<import("mongoose").Document<unknown, any, import("../models/variants_data.model").VariantsData> & import("../models/variants_data.model").VariantsData & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
