import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    handleGetCartItems(request: any): Promise<import("../models/cart-item.model").CartItem[]>;
    handleGetSaveLaterProducts(request: any): Promise<import("../models/save_to_later.model").SavedToLater[]>;
    handleAddCartItem(entireBody: AddCartItemDto, request: any): Promise<string>;
    handleAddProductToSaveLater(entireBody: AddCartItemDto, request: any): Promise<string>;
    handleUpdateCartItem(entireBody: UpdateCartItemDto, request: any): Promise<void>;
    handleDeleteCartItem(request: any, productId: string): Promise<void>;
    handleRemoveProductFromSaveLater(request: any, productId: string): Promise<void>;
}
