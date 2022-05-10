import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { FaqSchema } from 'src/models/faq.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductSchema } from 'src/models/product.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Faq', schema: FaqSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
    AuthModule,
  ],
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
