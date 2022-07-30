/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    getDiagnosisFee(categoryCode: string): Promise<500 | 300 | 800 | 400>;
    createServiceRequest(request: any, entireBody: CreateServiceDto): Promise<{
        orderNumber: string;
    }>;
    getOrders(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/service_order.model").ServiceOrderModel> & import("../models/service_order.model").ServiceOrderModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getNotifications(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/notification.model").NotificationModel> & import("../models/notification.model").NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getFaqs(): Promise<(import("mongoose").Document<unknown, any, import("../models/faq.model").Faq> & import("../models/faq.model").Faq & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
