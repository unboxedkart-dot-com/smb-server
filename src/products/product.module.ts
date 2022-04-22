import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../models/product.model';
import { ReviewSchema } from 'src/models/review.model';
import { QuestionAndAnswerSchema } from 'src/models/q_and_a.model';
import { ProductSpecsSchema } from 'src/models/product-specs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Review', schema: ReviewSchema },
      { name: 'QuestionAndAnswer', schema: QuestionAndAnswerSchema },
      { name: 'ProductSpecs', schema: ProductSpecsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
