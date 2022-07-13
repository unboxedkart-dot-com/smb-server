import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from 'src/models/service.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Service', schema: ServiceSchema }],
      // 'serviceDb',
    ),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
