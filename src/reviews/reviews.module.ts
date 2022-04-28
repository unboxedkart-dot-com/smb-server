import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from 'src/models/review.model';
import { ReviewsDataSchema } from 'src/models/reviews_data.model';
import { UserSchema } from 'src/models/user.model';
import { ProductSchema } from 'src/models/product.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Review', schema: ReviewSchema },
      { name: 'ReviewsData', schema: ReviewsDataSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
    AuthModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
