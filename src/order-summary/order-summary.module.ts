import { Module } from '@nestjs/common';
import { OrderSummaryController } from './order-summary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { ProductSchema } from 'src/models/product.model';
import { CouponSchema } from 'src/models/coupon.model';
import { OrderSummarySchema } from 'src/models/order_summary.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderSummaryService } from './order-summary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'OrderSummary', schema: OrderSummarySchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Coupon', schema: CouponSchema },
    ]),
  ],
  controllers: [OrderSummaryController],
  providers: [OrderSummaryService, JwtAuthGuard],
})
export class OrderSummaryModule {}
