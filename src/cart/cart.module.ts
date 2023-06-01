import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { UserSchema } from 'src/models/user.model';
import { ProductSchema } from 'src/models/product.model';
import { CartItemSchema } from 'src/models/cart-item.model';
import { MongooseModule } from '@nestjs/mongoose';
import { SavedToLaterSchema } from 'src/models/save_to_later.model';
import { TrackingNotificationSchema } from 'src/models/tracking-notification.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CartItem', schema: CartItemSchema },
      { name: 'SavedToLater', schema: SavedToLaterSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'TrackingNotification', schema: TrackingNotificationSchema},
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, JwtAuthGuard],
})
export class CartModule {}
