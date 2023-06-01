import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { ProductSchema } from 'src/models/product.model';
import { SearchTermSchema } from 'src/models/search_term';
import { TrackingNotificationSchema } from 'src/models/tracking-notification.model';
import { UserSchema } from 'src/models/user.model';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'User', schema: UserSchema },
      { name: 'SearchTerm', schema: SearchTermSchema },
      { name: 'TrackingNotification', schema: TrackingNotificationSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService, JwtAuthGuard],
})
export class SearchModule {}
