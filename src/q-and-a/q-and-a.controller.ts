import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';
import { QAndAService } from './q-and-a.service';

@Controller('q-and-a')
export class QAndAController {
  constructor(
    private readonly qAndAService: QAndAService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async handleGetQuestionAndAnswers(@Query('id') productId: string) {
    const result = await this.qAndAService.getProductQuestionAndAnswers(
      productId,
    );
    return result;
  }

  @Get('/product/:id')
  async handleGetProductQandA(@Param('id') productId: string) {
    console.log('given product id', productId);
    const qAndA = await this.qAndAService.getProductQuestionAndAnswers(
      productId,
    );
    return qAndA;
  }

  @Get('/product/all/:id')
  async handleGetAllProductQandA(@Param('id') productId: string) {
    console.log('given product id', productId);
    const qAndA = await this.qAndAService.getAllProductQuestionAndAnswers(
      productId,
    );
    return qAndA;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/answers')
  async handleGetAnswers(@Req() request: any) {
    console.log('getting answers', request.user.userId);
    const userId = request.user.userId;

    const result = await this.qAndAService.getUserAnswers(userId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/questions')
  async handleGetQuestions(@Req() request: any) {
    console.log('getting answers');
    const userId = request.user.userId;
    const result = await this.qAndAService.getUserQuestions(userId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/question')
  async handleCreateQuestion(
    @Req() request: any,
    @Body() entireBody: CreateQuestionDto,
  ) {
    const userId = request.user.userId;
    const question = await this.qAndAService.createQuestion(userId, entireBody);
    return question;
  }


  @UseGuards(JwtAuthGuard)
  @Post('/create/answer')
  async handleCreateAnswer(
    @Req() request: any,
    @Body() entireBody: CreateAnswerDto,
  ) {
    const userId = request.user.userId;
    await this.qAndAService.createAnswer(userId, entireBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  async handleGetQuestionsFeed(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.qAndAService.getQuestionsFeed(userId);
    return response;
  }





}
