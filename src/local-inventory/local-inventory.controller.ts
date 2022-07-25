import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { AddProductDto } from './dto/add-product.dto';
import { AddVendorDto } from './dto/add-seller.dto';
import { SellProductDto } from './dto/sell-product.dto';
import { LocalInventoryService } from './local-inventory.service';

@Controller('local-inventory')
export class LocalInventoryController {
  constructor(
    private readonly localInventoryService: LocalInventoryService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}

  @Get('/search')
  async handleGetSearchedProducts(
    @Query('title') title: string,
    @Query('category') category: string,
    @Query('brand') brand: string,
    @Query('serialNumber') serialNumber: string,
  ) {
    return await this.localInventoryService.getNewSearch(
      title,
      category,
      brand,
      serialNumber,
    );
  }

  @Post('/add-product')
  async addProduct(
    @Req() request: any,
    @Body()
    entireBody: AddProductDto,
  ) {
    console.log('entire body', entireBody);
    const generatedId = await this.localInventoryService.addProduct(entireBody);
    // return {
    //   data: {
    //     response: generatedId,
    //   },
    // };
  }

  @Patch('/sell-product')
  async sellProduct(
    @Req() request: any,
    @Body()
    entireBody: SellProductDto,
  ) {
    await this.localInventoryService.sellProduct(entireBody);
  }

  @Post('/add-vendor')
  async addVendor(
    @Req() request: any,
    @Body()
    entireBody: AddVendorDto,
  ) {
    return await this.localInventoryService.addVendor(entireBody);
  }

  @Get('/get-vendors')
  async handleGetVendors() {
    return await this.localInventoryService.getVendors();
  }

  @Get('overview')
  async getOverview() {}

  @Get('/sales-data')
  async getSalesData() {}

  @Get('/available-inventory')
  async getAvailableInventory(
    @Query('title') title: string,
    @Query('category') category: string,
    @Query('brand') brand: string,
    @Query('serialNumber') serialNumber: string,
  ) {
    return this.localInventoryService.getAvailableInventory(
      title,
      category,
      brand,
      serialNumber,
    );
  }
  @Get('/sold-inventory')
  async getSoldInventory(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    console.log('getting sold inventory');
    return this.localInventoryService.getSoldInventory(startDate, endDate);
  }

  @Get('/vendors')
  async getVendors() {
    return this.localInventoryService.getVendors();
  }

  @Post('/upload-purchase-invoice')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadPurchaseInvoice(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
    @Body() Body: any,
  ) {
    console.log('uploading invoice', file, typeof file);
    const response = this.s3Service.uploadPurchaseInvoice(file);
    return response;
  }

  @Post('/upload-original-invoice')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadOriginalInvoice(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
    @Body() Body: any,
  ) {
    console.log('uploading invoice', file, typeof file);
    const response = this.s3Service.uploadOriginalInvoice(file);
    return response;
  }

  @Post('/upload-seller-id-proof')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadSellerIdProof(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
    @Body() Body: any,
  ) {
    console.log('uploading invoice', file, typeof file);
    const response = this.s3Service.uploadSellerIdProof(file);
    return response;
  }
}
