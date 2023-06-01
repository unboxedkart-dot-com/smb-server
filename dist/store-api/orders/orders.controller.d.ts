/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { S3Service } from 'src/s3/s3.service';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly authService;
    private readonly s3Service;
    constructor(ordersService: OrdersService, authService: AuthService, s3Service: S3Service);
    handleGetAllOrders(request: any, status: string): Promise<import("../../models/orderItem.model").OrderItem[]>;
    handleGetReferrals(request: any): Promise<import("../../models/referral_order").ReferralOrder[]>;
    handleCreateOrder(request: any): Promise<string>;
    handleGetOrdersItems(request: any): Promise<import("../../models/orderItem.model").OrderItem[]>;
    handleGetOrder(id: string, request: any): Promise<import("mongoose").Document<unknown, any, import("../../models/order.model").Order> & import("../../models/order.model").Order & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    handleGetOrderItem(request: any, orderId: string): Promise<{
        status: string;
        message: string;
        data: {
            orderItem: import("mongoose").Document<unknown, any, import("../../models/orderItem.model").OrderItem> & import("../../models/orderItem.model").OrderItem & {
                _id: import("mongoose").Types.ObjectId;
            };
            reviewData: import("mongoose").Document<unknown, any, import("../../models/review.model").Review> & import("../../models/review.model").Review & {
                _id: import("mongoose").Types.ObjectId;
            };
            review?: undefined;
        };
    } | {
        status: string;
        message: string;
        data: {
            orderItem: import("mongoose").Document<unknown, any, import("../../models/orderItem.model").OrderItem> & import("../../models/orderItem.model").OrderItem & {
                _id: import("mongoose").Types.ObjectId;
            };
            review: any;
            reviewData?: undefined;
        };
    }>;
    handleSendInvoiceCopy(request: any, orderId: string): Promise<void>;
    _generateOrderNumber(): string;
}
