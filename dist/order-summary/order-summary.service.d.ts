import { Model } from 'mongoose';
import { CouponsService } from 'src/coupons/coupons.service';
import { CartItem } from 'src/models/cart-item.model';
import { Coupon } from 'src/models/coupon.model';
import { OrderSummary } from 'src/models/order_summary.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { OrdersService } from 'src/orders/orders.service';
import { AddDeliveryAddressDto } from './dto/add-address.dto';
import { AddSelectedStoreDto } from './dto/add-selected-store.dto';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { UpdateProductCountDto } from './dto/update-count.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
export declare class OrderSummaryService {
    private readonly orderSummaryModel;
    private readonly userModel;
    private readonly paymentModel;
    private readonly productModel;
    private readonly couponModel;
    private readonly ordersService;
    private readonly couponService;
    constructor(orderSummaryModel: Model<OrderSummary>, userModel: Model<User>, paymentModel: Model<User>, productModel: Model<Product>, couponModel: Model<Coupon>, ordersService: OrdersService, couponService: CouponsService);
    getPayableAmount(userId: string): Promise<{
        payableAmount: number;
        paymentOrderId: any;
        partialPaymentOrderId: any;
        partialPaymentAmount: number;
        name: string;
        email: string;
        phoneNumber: string;
    }>;
    getPartialPaymentAmount(userId: string): Promise<{
        payableAmount: number;
        orderId: any;
        name: string;
        email: string;
        phoneNumber: string;
    }>;
    createPaymentOrder(payableAmount: number, orderNumber: string): Promise<any>;
    addPaymentMethod(userId: string, paymentMethod: string): Promise<{
        status: string;
        message: string;
        orderNumber: string;
        orderData: string;
    }>;
    verifyPaymentSignature(userId: string, entireBody: VerifyPaymentDto): Promise<{
        status: string;
        message: string;
        orderNumber: string;
    } | {
        status: string;
        message: string;
        orderNumber?: undefined;
    }>;
    verifyPartialPaymentSignature(userId: string, entireBody: VerifyPaymentDto): Promise<{
        status: string;
        message: string;
        orderNumber: string;
    } | {
        status: string;
        message: string;
        orderNumber?: undefined;
    }>;
    _calculateAmount(orderItems: any): Promise<number>;
    _getSingleItemPrice(productId: string, productCount: number): Promise<number>;
    getOrderSummaryItems(userId: string): Promise<CartItem[]>;
    createOrderSummaryItems(userId: string, entireBody: CreateOrderSummaryDto): Promise<void>;
    addDeliveryAddress(userId: string, entireBody: AddDeliveryAddressDto): Promise<void>;
    addSelectedStoreDetails(userId: string, entireBody: AddSelectedStoreDto): Promise<void>;
    addCouponDetails(userId: string, couponCode: String): Promise<void>;
    updateCount(userId: string, entireBody: UpdateProductCountDto): Promise<void>;
    _generateOrderNumber(): string;
    _calculateCartValue(orderItems: any): Promise<number>;
}
