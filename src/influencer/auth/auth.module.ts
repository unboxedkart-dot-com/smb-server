import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenSchema } from 'src/user/models/refresh-token.model';
import { UserSchema } from 'src/user/models/user.model';
import { JwtStrategy } from './jwt-strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-strategies/jwt-auth.guard';
import { JwtRefreshStrategy } from './jwt-strategies/jwt-refresh.strategy';
import { InfluencerSchema } from '../models/influencer.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Influencer', schema: InfluencerSchema },
        { name: 'User', schema: UserSchema },
        { name: 'RefreshToken', schema: RefreshTokenSchema },
      ],
      'influencerDb',
    ),
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
export class InfluencerAuthModule {}
