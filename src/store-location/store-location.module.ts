import { Module } from '@nestjs/common';
import { StoreLocationService } from './store-location.service';
import { StoreLocationController } from './store-location.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreLocationSchema } from 'src/models/store_location.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'StoreLocation', schema: StoreLocationSchema },
    ]),
  ],
  controllers: [StoreLocationController],
  providers: [StoreLocationService, JwtAuthGuard],
})
export class StoreLocationModule {}
