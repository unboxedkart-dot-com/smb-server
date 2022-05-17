import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/models/order.model';
import { JwtStrategy } from 'src/auth/jwt-strategies/jwt.strategy';
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
import { OrderSummarySchema } from 'src/models/order_summary.model';
import { PaymentSchema } from 'src/models/payment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OrderSummary', schema: OrderSummarySchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Payment', schema: PaymentSchema },
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
  exports: [OrdersService],
})
export class OrdersModule {}
