import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { FavoriteSchema } from 'src/models/favorite.model';
import { UserSchema } from 'src/models/user.model';
import { ProductSchema } from 'src/models/product.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Favorite', schema: FavoriteSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtAuthGuard],
})
export class FavoritesModule {}