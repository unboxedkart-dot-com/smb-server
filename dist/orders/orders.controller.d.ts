/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly authService;
    constructor(ordersService: OrdersService, authService: AuthService);
    handleGetReferrals(request: any): Promise<import("../models/referral_order").ReferralOrder[]>;
    handleDeleteAllOrder(): Promise<void>;
    createDummyOrder(): Promise<void>;
    handleCreateOrder(request: any, entireBody: CreateOrderDto): Promise<{
        orderNumber: string;
        orderDate: number;
        selectedPickUpDate: number;
        deliveryDate: string;
        pickUpDateInString: string;
        pickUpTimeInString: string;
        paymentType: import("../models/order.model").paymentTypes;
        deliveryType: String;
        selectedAddress: any;
        selectedStore: any;
        orderItems: {
            orderItemsCount: number;
            orderItems: any[];
            orderTotal: number;
        };
    }>;
    handleGetOrdersItems(request: any): Promise<import("../models/orderItem.model").OrderItem[]>;
    handleGetOrderItem(request: any, orderId: string): Promise<{
        status: string;
        message: string;
        data: {
            orderItem: import("mongoose").Document<unknown, any, import("../models/orderItem.model").OrderItem> & import("../models/orderItem.model").OrderItem & {
                _id: import("mongoose").Types.ObjectId;
            };
            reviewData: import("mongoose").Document<unknown, any, import("../models/review.model").Review> & import("../models/review.model").Review & {
                _id: import("mongoose").Types.ObjectId;
            };
            review?: undefined;
        };
    } | {
        status: string;
        message: string;
        data: {
            orderItem: import("mongoose").Document<unknown, any, import("../models/orderItem.model").OrderItem> & import("../models/orderItem.model").OrderItem & {
                _id: import("mongoose").Types.ObjectId;
            };
            review: any;
            reviewData?: undefined;
        };
    }>;
    updateOrderItem(request: any, productId: string): Promise<void>;
    handleAcceptOrder(request: any, orderItemId: string): Promise<void>;
    handleSetOrderReadyForPickup(request: any, orderItemId: string): Promise<void>;
    handleSerOrderDelivered(request: any, orderItemId: string): Promise<void>;
    handleSetOrderShipped(request: any, orderItemId: string): Promise<void>;
    handleSetOrderOutForDelivery(request: any, orderItemId: string): Promise<void>;
}
