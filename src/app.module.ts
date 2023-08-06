import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { S3Module } from './s3/s3.module';
import { AuthModule } from './user/auth/auth.module';
import { CampaignModule } from './user/campaign/campaign.module';
import { UserModule } from './user/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    // MongooseModule.forRoot(process.env.USER_DB_CONNECTION_URL),
    // MongooseModule.forRoot(process.env.INFLUENCER_DB_CONNECTION_URL, {
    //   connectionName: 'influencerDb',
    // }),
    MongooseModule.forRoot(
      'mongodb+srv://socialmediabook:6gWvSw5O6gvS6tc0@smb-user.wmidzts.mongodb.net/userDb?retryWrites=true&w=majority',
      {
        connectionName: 'userDb',
      },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://socialmediabook:6gWvSw5O6gvS6tc0@smb-user.wmidzts.mongodb.net/userDb?retryWrites=true&w=majority',
      {
        connectionName: 'influencerDb',
      },
    ),
    MailModule,
    UserModule,
    S3Module,
    CampaignModule,
  ],
})
export class AppModule {}
