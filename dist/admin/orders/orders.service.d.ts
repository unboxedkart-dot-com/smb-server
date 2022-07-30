/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Coupon } from 'src/models/coupon.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import { Order } from 'src/models/order.model';
import { OrderItem } from 'src/models/orderItem.model';
import { OrderSummary } from 'src/models/order_summary.model';
import { Payment } from 'src/models/payment.model';
import { Product } from 'src/models/product.model';
import { ReferralOrder } from 'src/models/referral_order';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { CancelOrderDto } from 'src/admin/orders/dto/cancel-order.dto';
export declare class OrdersService {
    private readonly orderModel;
    private readonly paymentModel;
    private readonly orderSummaryModel;
    private readonly productModel;
    private readonly couponModel;
    private readonly orderItemModel;
    private readonly userModel;
    private readonly reviewModel;
    private readonly itemPurchasedUsersModel;
    private readonly referralModel;
    constructor(orderModel: Model<Order>, paymentModel: Model<Payment>, orderSummaryModel: Model<OrderSummary>, productModel: Model<Product>, couponModel: Model<Coupon>, orderItemModel: Model<OrderItem>, userModel: Model<User>, reviewModel: Model<Review>, itemPurchasedUsersModel: Model<ItemPurchasedUser>, referralModel: Model<ReferralOrder>);
    getOrder(userId: string, orderNumber: string): Promise<import("mongoose").Document<unknown, any, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOrderItem(userId: string, orderItemId: string): Promise<{
        status: string;
        message: string;
        data: {
            orderItem: import("mongoose").Document<unknown, any, OrderItem> & OrderItem & {
                _id: import("mongoose").Types.ObjectId;
            };
            reviewData: import("mongoose").Document<unknown, any, Review> & Review & {
                _id: import("mongoose").Types.ObjectId;
            };
            review?: undefined;
        };
    } | {
        status: string;
        message: string;
        data: {
            orderItem: import("mongoose").Document<unknown, any, OrderItem> & OrderItem & {
                _id: import("mongoose").Types.ObjectId;
            };
            review: any;
            reviewData?: undefined;
        };
    }>;
    getSalesOverview(startDate: string): Promise<{
        sales: [];
        orders: [];
    }>;
    acceptOrder(userId: string, orderItemId: string): Promise<void>;
    orderReadyForPickUp(userId: string, orderItemId: string): Promise<void>;
    orderShipped(userId: string, orderItemId: string): Promise<void>;
    orderOutForDelivery(userId: string, orderItemId: string): Promise<void>;
    orderDelivered(userId: string, orderItemId: string): Promise<void>;
    cancelOrder(userId: string, entireBody: CancelOrderDto): Promise<void>;
    deleteAll(): Promise<void>;
    _handleSendOrderConfirmedMessage(order: any): Promise<void>;
    _handleSendOrderConfirmedMail(order: any): Promise<void>;
    _handleOrderConfirmationNotification(order: any): Promise<void>;
    _handleSendOutForPickUpMail(order: any): Promise<void>;
    _handleSendOutForPickUpMessage(order: any): Promise<void>;
    _handleSendOrderReadyForPickUpNotification(order: any): Promise<void>;
    _handleSendOrderShippedMessage(order: any): Promise<void>;
    _handleSendOrderShippedMail(order: any): Promise<void>;
    _handleSendOrderShippedNotification(order: any): Promise<void>;
    _handleSendOutForDeliveryMessage(order: any): Promise<void>;
    _handleSendOutForDeliveryMail(order: any): Promise<void>;
    _handleSendOutForDeliveryNotification(order: any): Promise<void>;
    _handleSendOrderDeliveredMessage(order: any): Promise<void>;
    _handleSendOrderDeliveredMail(order: any): Promise<void>;
    _handleSendOrderDeliveredNotification(order: any): Promise<void>;
    sendNotification(data: any): void;
}
