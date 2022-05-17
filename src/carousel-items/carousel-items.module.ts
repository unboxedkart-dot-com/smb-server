import { Module } from '@nestjs/common';
import { CarouselItemsService } from './carousel-items.service';
import { CarouselItemsController } from './carousel-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarouselItemSchema } from 'src/models/carousel_item.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CarouselItem', schema: CarouselItemSchema },
    ]),
  ],
  controllers: [CarouselItemsController],
  providers: [CarouselItemsService],
})
export class CarouselItemsModule {}
