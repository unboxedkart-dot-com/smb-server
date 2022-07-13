import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from 'src/models/service.model';
import { ServiceOrderSchema } from 'src/models/service_order.model';
import { UserSchema } from 'src/models/user.model';
import { NotificationSchema } from 'src/models/notification.model';
import { FaqSchema } from 'src/models/faq.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'ServiceOrder', schema: ServiceOrderSchema },
        { name: 'Faq', schema: FaqSchema },
        { name: 'Notification', schema: NotificationSchema },
        { name: 'Service', schema: ServiceSchema }
      ],
      'serviceDb',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
