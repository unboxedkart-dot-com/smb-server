import { CreateFaqDto } from './dto/create-faq.dto';
import { FaqsService } from './faqs.service';
export declare class FaqsController {
    private readonly faqsService;
    constructor(faqsService: FaqsService);
    handleGetFaqs(): Promise<import("../models/faq.model").Faq[]>;
    handleCreateFaq(request: any, entireBody: CreateFaqDto): Promise<void>;
}
