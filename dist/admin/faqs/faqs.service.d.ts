/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Faq } from 'src/models/faq.model';
import { Model } from 'mongoose';
import { CreateFaqDto } from './dto/create-faq.dto';
import { Product } from 'src/models/product.model';
export declare class FaqsService {
    private readonly faqModel;
    private readonly productModel;
    constructor(faqModel: Model<Faq>, productModel: Model<Product>);
    createFaq(userId: string, entireBody: CreateFaqDto): Promise<import("mongoose").Document<unknown, any, Faq> & Faq & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateFaq(): Promise<void>;
    deleteFaq(): Promise<void>;
}
