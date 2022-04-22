import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/models/order.model';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ProductSchema } from 'src/models/product.model';
import { CouponSchema } from 'src/models/coupon.model';
import { OrderItemSchema } from 'src/models/orderItem.model';
import { UserSchema } from 'src/models/user.model';
import { ReviewSchema } from 'src/models/review.model';
import { ReferralOrderSchema } from 'src/models/referral_order';
import { ItemPurchasedUsersSchema } from 'src/models/item-purchased-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Coupon', schema: CouponSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Review', schema: ReviewSchema },
      { name: 'ReferralOrder', schema: ReferralOrderSchema },
      { name: 'ItemPurchasedUsers', schema: ItemPurchasedUsersSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtStrategy],
})
export class OrdersModule {}
