import { Module } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { ProductDetailsController } from './product-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSpecsSchema } from 'src/models/product-specs';
import { ProductDescriptionSchema } from 'src/models/product-description';
import { ProductSchema } from 'src/models/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductSpecs', schema: ProductSpecsSchema },
      { name: 'ProductDescription', schema: ProductDescriptionSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
})
export class ProductDetailsModule {}
