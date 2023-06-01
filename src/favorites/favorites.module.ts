import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { FavoriteSchema } from 'src/models/favorite.model';
import { UserSchema } from 'src/models/user.model';
import { ProductSchema } from 'src/models/product.model';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { TrackingNotificationSchema } from 'src/models/Tracking-notification.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Favorite', schema: FavoriteSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'TrackingNotification', schema: TrackingNotificationSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtAuthGuard],
})
export class FavoritesModule {}
// const newNotification = new this.trackingNotificationModel({
//   userId: userId,
//   title: `Favorite Added by ${userData.name} - ${userData.phoneNumber}`,
//   subtitle: `${productData.title}`,
//   content: `It was priced at ₹${productData.pricing.sellingPrice} (₹${productData.pricing.price})`,
//   type: 'wishlist-item',
// });