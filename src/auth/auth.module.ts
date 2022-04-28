import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { CouponSchema } from 'src/models/coupon.model';
import { SearchTermSchema } from 'src/models/search_term';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Coupon', schema: CouponSchema },
      { name: 'SearchTerm', schema: SearchTermSchema },
    ]),
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'raina',
      }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}
