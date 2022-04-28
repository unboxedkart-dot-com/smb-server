import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../models/product.model';
import { ReviewSchema } from 'src/models/review.model';
import { QuestionAndAnswerSchema } from 'src/models/q_and_a.model';
import { ProductSpecsSchema } from 'src/models/product-specs';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Review', schema: ReviewSchema },
      { name: 'QuestionAndAnswer', schema: QuestionAndAnswerSchema },
      { name: 'ProductSpecs', schema: ProductSpecsSchema },
    ]),
    AuthModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtAuthGuard],
})
export class ProductsModule {}
