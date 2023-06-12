import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async handleGetCartItems(@Req() request: any) {
    const userId = request.user.userId;
    console.log('getting cart items', userId);
    const result = await this.cartService.getCartItems(userId);
    return result;
  }

  @Get('/save-later')
  async handleGetSaveLaterProducts(@Req() request: any) {
    const userId = request.user.userId;
    const result = await this.cartService.getSavedLaterProducts(userId);
    return result;
  }

  @Post('add')
  async handleAddCartItem(
    @Body() entireBody: AddCartItemDto,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    const result = await this.cartService.addCartItem(
      userId,
      entireBody.productId,
      // entireBody.productCount,
    );
    return result;
  }

  @Post('/save-later/add')
  async handleAddProductToSaveLater(
    @Body() entireBody: AddCartItemDto,
    @Req() request: any,
  ) {
    console.log('adding product to savelayer');
    const userId = request.user.userId;
    const result = await this.cartService.addSavedToLater(
      userId,
      entireBody.productId,
      // entireBody.productCount,
    );
    return result;
  }

  @Patch('update')
  async handleUpdateCartItem(
    @Body() entireBody: UpdateCartItemDto,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    const result = await this.cartService.updateCartItem(
      userId,
      entireBody.productId,
      entireBody.productCount,
    );
    return result;
  }

  @Delete('delete/:id')
  async handleDeleteCartItem(
    @Req() request: any,
    @Param('id') productId: string,
  ) {
    const userId = request.user.userId;
    const result = await this.cartService.deleteCartItem(userId, productId);
    return result;
  }

  @Delete('/save-later/delete/:id')
  async handleRemoveProductFromSaveLater(
    @Req() request: any,
    @Param('id') productId: string,
  ) {
    const userId = request.user.userId;
    const result = await this.cartService.removeProductFromSaveLater(
      userId,
      productId,
    );
    return result;
  }
}
