import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    handleGetCartItems(request: any): Promise<import("../models/cart-item.model").CartItem[]>;
    handleAddCartItem(entireBody: AddCartItemDto, request: any): Promise<string>;
    handleUpdateCartItem(entireBody: UpdateCartItemDto, request: any): Promise<void>;
    handleDeleteCartItem(request: any, productId: string): Promise<void>;
}
