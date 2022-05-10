import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from 'src/models/coupon.model';
import { UserSchema } from 'src/models/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Coupon', schema: CouponSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [CouponsController],
  providers: [CouponsService, JwtAuthGuard],
})
export class CouponsModule {}
