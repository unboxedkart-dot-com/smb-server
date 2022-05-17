import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { CreateFaqDto } from './dto/create-faq.dto';
import { FaqsService } from './faqs.service';

@Controller('faqs')
export class FaqsController {
  constructor(
    private readonly faqsService: FaqsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Get()
  async handleGetFaqs() {
    console.log('get faqs started');
    const faqs = await this.faqsService.getFaqs();
    return faqs;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async handleCreateFaq(@Req() request: any, @Body() entireBody: CreateFaqDto) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    console.log('faq body', entireBody);
    if (isAdmin) {
      await this.faqsService.createFaq(userId, entireBody);
    } else {
      throw new ForbiddenException(
        'You are not allowed to perform this action',
      );
    }
  }
}
