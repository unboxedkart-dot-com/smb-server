import { Module } from '@nestjs/common';
import { OrderSummaryController } from './order-summary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { ProductSchema } from 'src/models/product.model';
import { CouponSchema } from 'src/models/coupon.model';
import { OrderSummarySchema } from 'src/models/order_summary.model';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { OrderSummaryService } from './order-summary.service';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { PaymentSchema } from 'src/models/payment.model';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'OrderSummary', schema: OrderSummarySchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Coupon', schema: CouponSchema },
      { name: 'Payment', schema: PaymentSchema },
    ]),
    OrdersModule,
    CouponsModule
  ],
  controllers: [OrderSummaryController],
  providers: [OrderSummaryService, JwtAuthGuard],
})
export class OrderSummaryModule {}
