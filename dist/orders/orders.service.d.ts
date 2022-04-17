import { Model } from 'mongoose';
import { Coupon } from 'src/models/coupon.model';
import { Order, paymentTypes } from 'src/models/order.model';
import { OrderItem } from 'src/models/orderItem.model';
import { Product } from 'src/models/product.model';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly orderModel;
    private readonly productModel;
    private readonly couponModel;
    private readonly orderItemModel;
    private readonly userModel;
    private readonly reviewModel;
    constructor(orderModel: Model<Order>, productModel: Model<Product>, couponModel: Model<Coupon>, orderItemModel: Model<OrderItem>, userModel: Model<User>, reviewModel: Model<Review>);
    deleteAll(): Promise<void>;
    createOrder(entireBody: CreateOrderDto, userId: string): Promise<{
        orderNumber: string;
        orderDate: number;
        selectedPickUpDate: number;
        paymentType: paymentTypes;
        deliveryType: String;
        selectedAddress: any;
        selectedStore: any;
        orderItems: {
            orderItemsCount: number;
            orderItems: any[];
            orderTotal: number;
        };
    }>;
    acceptOrder(userId: string, orderItemId: string): Promise<void>;
    orderReadyForPickUp(userId: string, orderItemId: string): Promise<void>;
    orderShipped(userId: string, orderItemId: string): Promise<void>;
    orderOutForDelivery(userId: string, orderItemId: string): Promise<void>;
    orderDelivered(userId: string, orderItemId: string): Promise<void>;
    getOrderItems(userId: string): Promise<OrderItem[]>;
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
    _generateOrderNumber(): string;
    _getCouponDiscount(couponCode: string, orderTotal: number): Promise<number>;
    _validateCouponCode(couponCode: string, orderTotal: number): Promise<{
        couponDiscount: number;
        payableAmount: number;
    }>;
    _generateOrderItemDetails(orderItemsList: any): Promise<{
        orderItemsCount: number;
        orderItems: any[];
        orderTotal: number;
    }>;
    _generateSingleOrderItemDetails(productId: string, count: number): Promise<{
        productId: string;
        pricePerItem: number;
        productCount: number;
        total: number;
        productDetails: {
            imageUrl: string;
            title: string;
            color: string;
            condition: string;
            brand: string;
            category: string;
        };
    }>;
    _handleSaveIndividualOrders(userDoc: any, params: IndividualOrderItem): Promise<void>;
    createPaymentOrder(): Promise<void>;
    validatePaymentSignature(): Promise<void>;
    _handleSendOrderPlacedMessage(userDoc: any, orderItems: any): Promise<void>;
    _handleSendOrderPlacedMail(order: any): Promise<void>;
    _handleSendOrderConfirmedMessage(order: any): Promise<void>;
    _handleSendOrderConfirmedMail(order: any): Promise<void>;
    _handleSendOutForPickUpMail(order: any): Promise<void>;
    _handleSendOutForPickUpMessage(order: any): Promise<void>;
    _handleSendOrderShippedMessage(order: any): Promise<void>;
    _handleSendOrderShippedMail(order: any): Promise<void>;
    _handleSendOutForDeliveryMessage(order: any): Promise<void>;
    _handleSendOutForDeliveryMail(order: any): Promise<void>;
    _handleSendOrderDeliveredMessage(order: any): Promise<void>;
    _handleSendOrderDeliveredMail(order: any): Promise<void>;
}
export interface IndividualOrderItem {
    paymentType: String;
    deliveryType: String;
    itemsCount: number;
    orderData: any;
    orderNumber: string;
    deliveryAddress: string;
    storeLocation: string;
    couponCode: string;
    couponDiscount: number;
}
