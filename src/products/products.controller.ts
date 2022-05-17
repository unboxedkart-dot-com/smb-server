import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
  Req,
  Inject,
  forwardRef,
  UnauthorizedException,
  Patch,
  UseFilters,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Http2ServerResponse } from 'http2';
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { Product } from '../models/product.model';
import { CreateProductDto } from './dto/add-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(JwtAuthGuard)

  @Post('/add')
  async addProduct(
    @Req() request: any,
    @Body()
    entireBody: CreateProductDto,
  ) {
    // const userId = request.user.userId;
    // console.log('user id 1', userId);
    // const isAdmin = await this.authService.CheckIfAdmin(userId);
    // console.log('isadmin', isAdmin);
    // if (isAdmin) {
      const generatedId = await this.productsService.insertProduct(entireBody);
      return {
        data: {
          response: generatedId,
        },
      };
    // } else {
    //   throw new ForbiddenException();
    // }
  }

  @Post('/add-many')
  async addManyProducts() {
    const generatedId = await this.productsService.insertAllProdcts();
    return {
      data: {
        response: generatedId,
      },
    };
  }

  // @Get()
  // async getProducts() {
  //   const products = await this.productsService.getProducts();
  //   return products;
  // }

  @Get()
  async getProduct(@Query('q') q: string) {
    const product = await this.productsService.getProduct(q);
    return product;
    // {
    //   data: {
    //     response:
    //   },
    // };
  }

  @Get('/variant')
  async getSelectedVariant(
    @Query('productCode') productCode: string,
    @Query('conditionCode') conditionCode: string,
    @Query('storageCode') storageCode: string,
    @Query('colorCode') colorCode: string,
    @Query('processorCode') processorCode: string,
    @Query('ramCode') ramCode: string,
  ) {
    const product = await this.productsService.getSelectedVariant(
      productCode,
      conditionCode,
      storageCode,
      colorCode,
      processorCode,
      ramCode,
    );
    console.log('seelcred product', product);
    return product;
  }

  @Delete()
  async handleDeleteProducts() {
    await this.productsService.deleteProducts();
    return 'products deleted';
  }

  // @UseFilters(HttpExceptionFilter)
  // @Catch()
  @UseGuards(JwtAuthGuard)
  @Patch('/update-count/:id')
  async handleUpdateInventoryCount(
    @Body('count') count: number,
    @Req() request: any,
    @Param('id') productId: string,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (!isAdmin) {
      await this.productsService.updateInventoryCount({ productId, count });
      return {
        statusCode: 200,
        message: 'product inventory count is updated',
      };
    } else {
      throw new ForbiddenException(
        'you are not allowed to perform this action',
      );
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async handleDeleteProduct(@Body('id') id: string, @Req() request: any) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      await this.productsService.deleteSingleProduct(id);
    } else {
      throw new ForbiddenException(
        'You are not allowed to perform this action',
      );
    }
  }

  @Get('/similar-products/:id')
  async handleGetSimilarProducts(@Param('id') productId: string) {
    const products = await this.productsService.getSimilarProducts(productId);
    return products;
  }

  @Get('/related-products/:id')
  async handleGetRelatedProducts(@Param('id') productId: string) {
    const products = await this.productsService.getRelatedProducts(productId);
    return products;
  }

  @Get('best-sellers')
  async handleGetBestSellers(
    @Query('brand') brand: string,
    @Query('condition') condition: string,
    @Query('category') category: string,
  ) {
    const products = await this.productsService.getBestSellers(
      brand,
      category,
      condition,
    );
    return products;
    //  {
    //   data: {
    //     response: products,
    //   },
    // };
  }

  @Get('featured-products')
  async handleGetFeaturedProducts(
    @Query('brand') brand: string,
    @Query('condition') condition: string,
    @Query('category') category: string,
  ) {
    const products = await this.productsService.getFeaturedProducts(
      brand,
      category,
      condition,
    );
    return products;
  }
}

// @Get('best-sellers/brand/:brand')
// async handleGetBestSellersByBrand() {

// }

// @Get('best-sellers/category/:category')
// async handleGetBestSellersByCategory() {}

// @Get('best-sellers/condition/:condition')
// async handleGetBestSellersByCondition() {}

// @Get('featured-products/brand/:brand')
// async handleGetFeaturedProductsByBrand() {}

// @Get('featured-products/category/:category')
// async handleGetFeaturedProductsByCategory() {}

// @Get('featured-products/condition/:condition')
// async handleGetFeaturedProductsByCondition() {}
