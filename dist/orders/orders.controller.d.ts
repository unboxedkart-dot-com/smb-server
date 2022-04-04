/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    handleCreateOrder(request: any, entireBody: CreateOrderDto): Promise<{
        orderNumber: string;
        orderDate: number;
        selectedPickUpDate: number;
        paymentType: import("../models/order.model").paymentTypes;
        deliveryType: string;
        selectedStore: any;
    }>;
    handleGetOrdersItems(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/orderItem.model").OrderItem> & import("../models/orderItem.model").OrderItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateOrderItem(request: any, productId: string): Promise<void>;
}
