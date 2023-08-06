import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { UserSchema } from 'src/user/models/user.model';
import { UserPaymentDetailsSchema } from 'src/user/models/user_payment_details.model';
import { JwtAuthGuard } from '../auth/jwt-strategies/jwt-auth.guard';
import { CampaignSchema } from '../models/campaign.model';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'User', schema: UserSchema },
        { name: 'Campaign', schema: CampaignSchema },
      ],
      'userDb',
    ),
    S3Module,
  ],
  controllers: [CampaignController],
  providers: [CampaignService, JwtAuthGuard, S3Service],
})
export class CampaignModule {}
