import { Module } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { AppVersionController } from './app-version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppVersionSchema } from 'src/models/app_version.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AppVersion', schema: AppVersionSchema },
    ]),
  ],
  controllers: [AppVersionController],
  providers: [AppVersionService],
})
export class AppVersionModule {}
