import { Module } from '@nestjs/common';
import { LocalInventoryService } from './local-inventory.service';
import { LocalInventoryController } from './local-inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorSchema } from 'src/models/local_inventory/vendor.model';
import { BuyerSchema } from 'src/models/local_inventory/buyer.model';
import { AgentSchema } from 'src/models/local_inventory/agent.model';
import { ProductSchema } from 'src/models/local_inventory/product.model';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Vendor', schema: VendorSchema },
        { name: 'Buyer', schema: BuyerSchema },
        { name: 'Agent', schema: AgentSchema },
        { name: 'Product', schema: ProductSchema },
      ],
      'inventoryDb',
    ),
    S3Module,
  ],
  controllers: [LocalInventoryController],
  providers: [LocalInventoryService, S3Service],
})
export class LocalInventoryModule {}
