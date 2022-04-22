import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFaqDto } from './dto/create-faq.dto';
import { FaqsService } from './faqs.service';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async handleGetFaqs() {
    console.log('get faqs started');
    const faqs = await this.faqsService.getFaqs();
    return faqs;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async handleCreateFaq(@Req() request: any, @Body() entireBody: CreateFaqDto) {
    const userId = request.user.userId;
    await this.faqsService.createFaq(userId, entireBody);
  }
}
