import { AuthService } from 'src/auth/auth.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { FaqsService } from './faqs.service';
export declare class FaqsController {
    private readonly faqsService;
    private readonly authService;
    constructor(faqsService: FaqsService, authService: AuthService);
    handleGetFaqs(): Promise<import("../models/faq.model").Faq[]>;
    handleCreateFaq(request: any, entireBody: CreateFaqDto): Promise<void>;
}
