import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { CartItem } from 'src/models/cart-item.model';
export declare class CartService {
    private readonly cartItemModel;
    private readonly userModel;
    private readonly productModel;
    constructor(cartItemModel: Model<CartItem>, userModel: Model<User>, productModel: Model<Product>);
    getCartItems(userId: string): Promise<CartItem[]>;
    addCartItem(userId: string, productId: string): Promise<string>;
    updateCartItem(userId: string, productId: string, productCount: number): Promise<void>;
    deleteCartItem(userId: string, productId: string): Promise<void>;
    _handleAddCartItem(userId: string, productId: string): Promise<void>;
}
