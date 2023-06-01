import { Module } from '@nestjs/common';
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
import { StoreTokenService } from './store-token.service';
import { StoreTokenController } from './store-token.controller';
import { StoreTokenSchema } from 'src/models/store-app/token.model';
import { StoreNotificationSchema } from 'src/models/store-app/store-notification.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'StoreToken', schema: StoreTokenSchema },
        { name: 'Enquiry', schema: StoreTokenSchema },
      ],
      'storeDb',
    ),
    MongooseModule.forFeature(
      [{ name: 'StoreNotification', schema: StoreNotificationSchema }],
      'storeDb',
    ),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
    // S3Module,
    AuthModule,
  ],
  controllers: [StoreTokenController],
  providers: [StoreTokenService, JwtStrategy],
})
export class StoreTokenModule {}
