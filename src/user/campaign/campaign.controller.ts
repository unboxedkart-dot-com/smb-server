import {
  Body,
  Controller,
  forwardRef,
  Get,
  Patch,
  Post,
  Inject,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { JwtAuthGuard } from '../auth/jwt-strategies/jwt-auth.guard';
import { CampaignService } from './campaign.service';
import { NewCampaignDto } from './dto/new-campaign.dto';

@Controller('user/campaigns')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadInvoice(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
    @Body() Body: any,
  ) {
    console.log('uploading photo', file, typeof file);
    const response = this.s3Service.uploadImage(file);
    return response;
  }

  @Post('/upload-video')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
    @Body() Body: any,
  ) {
    console.log('uploading video', file, typeof file);
    const response = this.s3Service.uploadVideo(file);
    return response;
  }

  // @UseGuards(JwtAuthGuard)
  @Get('payable-amount')
  async handleGetPayableAmount(
    @Req() request: any,
    @Query('amount') amount: string,
  ) {
    console.log('getting payable amount');
    // const userId = request.user.userId;
    const response = await this.campaignService.getPayableAmount('123', amount);
    console.log(response);
    return response;
  }

  // @Post('verify-payment')
  // async handleVerifyPayment(
  //   @Req() request: any,
  //   @Body() entireBody: VerifyPaymentDto,
  // ) {
  //   const userId = request.user.userId;
  //   const response = await this.campaignService.verifyPaymentSignature(
  //     userId,
  //     entireBody,
  //   );
  //   console.log('response verify', response);
  //   return response;
  // }

  @UseGuards(JwtAuthGuard)
  @Post('/create-campaign')
  async handleGetUserData(
    @Req() request: any,
    @Body() entireBody: NewCampaignDto,
  ) {
    const userId = request.user.userId;
    const response = await this.campaignService.addNewCampaign(
      userId,
      entireBody,
    );
    return response;

    // const response = await this.userService.getUserData(userId);
    // return response;
  }
}
