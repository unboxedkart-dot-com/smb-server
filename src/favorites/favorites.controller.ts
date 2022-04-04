import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async handleGetFavorites(@Req() request: any) {
    const userId = request.user.userId;
    return await this.favoritesService.getFavorites(userId);
  }

  @Post('add')
  async handleAddFavorite(
    @Req() request: any,
    @Body('productId') productId: string,
  ) {
    const userId = request.user.userId;
    const result = await this.favoritesService.addFavorite(userId, productId);
    return result;
  }

  @Delete('delete/:id')
  async handleDeleteFavorite(
    @Req() request: any,
    @Param('id') productId: string,
  ) {
    const userId = request.user.userId;
    const result = await this.favoritesService.deleteFavorite(userId, productId);
    return result;
  }
}
