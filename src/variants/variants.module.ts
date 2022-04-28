import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VariantsDataSchema } from 'src/models/variants_data.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VariantsData', schema: VariantsDataSchema },
    ]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantsModule {}
