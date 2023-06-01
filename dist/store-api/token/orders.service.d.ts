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
import { CancelOrderDto } from './dto/cancel-order.dto';
export declare class StoreTokenService {
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
    getAllOrders(status: string): Promise<OrderItem[]>;
    getReferrals(userId: string): Promise<ReferralOrder[]>;
    createOrder(userId: string): Promise<string>;
    cancelOrder(userId: string, entireBody: CancelOrderDto): Promise<void>;
    getOrderItems(userId: string): Promise<OrderItem[]>;
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
    _getCouponDiscount(userId: string, userName: string, orderNumber: string, couponCode: string, orderTotal: number): Promise<number>;
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
    _handleSaveIndividualOrders(order: Order): Promise<void>;
    createPaymentOrder(): Promise<void>;
    validatePaymentSignature(): Promise<void>;
    sendNotification(data: any): void;
    _handleSendOrderPlacedMessage(userDoc: any, orderItems: any): Promise<void>;
    _handleSendOrderPlacedMail(userDoc: any, orderItems: any): Promise<void>;
    _handleSendReferralOrderPlaceMessage(name: string, phoneNumber: number): Promise<void>;
    _handleSendReferralOrderPlaceMail(userName: any, emailId: string): Promise<void>;
    referralOrderNotification(referrerName: any, referrerId: any, referreName: any): Promise<void>;
    sendInvoiceCopy(userId: string, orderId: string): Promise<void>;
}
export interface IndividualOrderItem {
    paymentType: String;
    paymentMethod: string;
    partialPaymentId: string;
    paymentId: string;
    deliveryType: String;
    itemsCount: number;
    orderData: any;
    orderNumber: string;
    couponCode: string;
    couponDiscount: number;
    shippingDetails: {
        shipDate: any;
        deliveryDate: string;
        deliveryDateInString: string;
        deliveryAddress: any;
    };
    pickUpDetails: {
        pickUpDate: any;
        storeLocation: any;
        pickUpTimeStart: string;
        pickUpTimeEnd: string;
        pickUpTimeInString: string;
        pickUpDateInString: string;
    };
}
