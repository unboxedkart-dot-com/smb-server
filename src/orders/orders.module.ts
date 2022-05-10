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
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';

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
    S3Module,
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtStrategy, S3Service],
})
export class OrdersModule {}
