import { Module } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { ProductDetailsController } from './product-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSpecsSchema } from 'src/models/product-specs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductSpecs', schema: ProductSpecsSchema },
    ]),
  ],
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
})
export class ProductDetailsModule {}
