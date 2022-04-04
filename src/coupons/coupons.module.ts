import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from 'src/models/coupon.model';
import { UserSchema } from 'src/models/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Coupon', schema: CouponSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CouponsController],
  providers: [CouponsService, JwtAuthGuard],
})
export class CouponsModule {}
