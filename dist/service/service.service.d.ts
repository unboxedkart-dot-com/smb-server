/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { ServiceOrderModel } from 'src/models/service_order.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { Faq } from 'src/models/faq.model';
import { NotificationModel } from 'src/models/notification.model';
export declare class ServiceService {
    private readonly serviceOrderModel;
    private readonly notificationModel;
    private readonly faqModel;
    private readonly userModel;
    constructor(serviceOrderModel: Model<ServiceOrderModel>, notificationModel: Model<NotificationModel>, faqModel: Model<Faq>, userModel: Model<User>);
    diagnosisFee(categoryCode: string): Promise<500 | 300 | 800 | 400>;
    createServiceRequest(userId: string, entireBody: CreateServiceDto): Promise<string>;
    orders(userId: string): Promise<(import("mongoose").Document<unknown, any, ServiceOrderModel> & ServiceOrderModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    notifications(userId: string): Promise<(import("mongoose").Document<unknown, any, NotificationModel> & NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    faqs(): Promise<(import("mongoose").Document<unknown, any, Faq> & Faq & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    _generateOrderNumber(): string;
    _getDiagnosisFee(category: string): 500 | 300 | 800 | 400;
}
