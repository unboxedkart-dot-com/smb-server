import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/models/user.model';
import { UserPaymentDetailsSchema } from 'src/user/models/user_payment_details.model';
import { JwtAuthGuard } from '../auth/jwt-strategies/jwt-auth.guard';
import { InfluencerSchema } from '../models/influencer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Influencer', schema: InfluencerSchema },
      { name: 'UserPaymentDetails', schema: UserPaymentDetailsSchema },
    ], 'userDb'),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
})
export class InfluencerModule {}
