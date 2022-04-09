import { AddAddressDto } from 'src/addresses/dto';
import { AddStoreLocationDto } from 'src/store-location/dto/add-store-location.dto';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { UpdateProductCountDto } from './dto/update-count.dto';
import { OrderSummaryService } from './order-summary.service';
export declare class OrderSummaryController {
    private readonly orderSummaryService;
    constructor(orderSummaryService: OrderSummaryService);
    handleGetOrderSummaryItems(request: any): Promise<import("../models/cart-item.model").CartItem[]>;
    handleCreateOrderSummaryItems(request: any, entireBody: CreateOrderSummaryDto): Promise<void>;
    handleUpdateCount(request: any, entireBody: UpdateProductCountDto): Promise<void>;
    handleAddCoupon(request: any, entireBody: any): Promise<void>;
    handleAddStoreDetails(request: any, entireBody: AddStoreLocationDto): Promise<void>;
    handleAddDeliveryAddress(entireBody: AddAddressDto, request: any): Promise<void>;
    handleGetPayableAmount(request: any): Promise<number>;
}
