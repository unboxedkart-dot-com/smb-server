import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '././jwt-strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { CouponSchema } from 'src/models/coupon.model';
import { SearchTermSchema } from 'src/models/search_term';
import { JwtRefreshStrategy } from './jwt-strategies/jwt-refresh.strategy';
import { RefreshTokenSchema } from 'src/models/refresh-token.model';
import { JwtAuthGuard } from './jwt-strategies/jwt-auth.guard';
import { TrackingNotificationSchema } from 'src/models/Tracking-notification.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Coupon', schema: CouponSchema },
      { name: 'SearchTerm', schema: SearchTermSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
      // { name: 'RefreshToken', schema: RefreshTokenSchema },
      { name: 'TrackingNotification', schema: TrackingNotificationSchema },
    ]),
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'raina',
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
