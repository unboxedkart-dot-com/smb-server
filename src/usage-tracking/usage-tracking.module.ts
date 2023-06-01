import { Module } from '@nestjs/common';
import { UsageTrackingControllerService } from './usage-tracking.service';
import { UsageTrackingController } from './usage-tracking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from 'src/models/coupon.model';
import { UserSchema } from 'src/models/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { ProductSchema } from 'src/models/product.model';
import { TrackingNotificationSchema } from 'src/models/tracking-notification.model';
import { CarouselItemSchema } from 'src/models/carousel_item.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'TrackingNotification', schema: TrackingNotificationSchema },
      { name: 'CarouselItem', schema: CarouselItemSchema },
    ]),
    AuthModule,
  ],
  controllers: [UsageTrackingController],
  providers: [UsageTrackingControllerService, JwtAuthGuard],
  exports: [UsageTrackingControllerService],
})
export class UsageTrackingModule {}
