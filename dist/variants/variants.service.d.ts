import mongoose from 'mongoose';
import { VariantsData } from 'src/models/variants_data.model';
import { Model } from 'mongoose';
export declare class VariantsService {
    private readonly variantDataModel;
    constructor(variantDataModel: Model<VariantsData>);
    addVariantsData(): Promise<void>;
    getVariantsData(productCode: string): Promise<mongoose.Document<unknown, any, VariantsData> & VariantsData & {
        _id: mongoose.Types.ObjectId;
    }>;
}
