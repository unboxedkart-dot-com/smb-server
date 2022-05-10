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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  async handleGetProductReviews(@Param('id') productId: string) {
    console.log('given product id', productId);
    const qAndA = await this.qAndAService.getProductQuestionAndAnswers(
      productId,
    );
    return qAndA;
    // return {
    //   data: reviews,
    // };
  }

  @Get('/product/all/:id')
  async handleGetAllProductReviews(@Param('id') productId: string) {
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
  @Patch('approve-question/:id')
  async handleApproveQuestion(
    @Param('id') questionId: string,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    await this.qAndAService.approveQuestion(userId, questionId);
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
  @Post('approve-answer/:id')
  async handleApproveAnswer(
    @Param('id') answerId: string,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      await this.qAndAService.approveAnswer(answerId);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  async handleGetQuestionsFeed(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.qAndAService.getQuestionsFeed(userId);
    return response;
  }

  // admin functions

  @UseGuards(JwtAuthGuard)
  @Get('/new-questions')
  async handleGetNewQuestions(@Req() request: any) {

    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.qAndAService.getNewQuestions();
      return response;

    } else {
      throw new ForbiddenException(
        'you are not allowed to perform this action',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/approved-questions')
  async handleGetApprovedQAndA(@Req() request: any) {

    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.qAndAService.getApprovedQAndA();
      return response;

    } else {
      throw new ForbiddenException(
        'you are not allowed to perform this action',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/new-answers')
  async handleGetNewAnswers(@Req() request: any) {

    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.qAndAService.getNewAnswers();
      return response;

    } else {
      throw new ForbiddenException(
        'you are not allowed to perform this action',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/approved-answers')
  async handleGetApprovedAnswers(@Req() request: any) {

    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.qAndAService.getApprovedAnswers();
      return response;

    } else {
      throw new ForbiddenException(
        'you are not allowed to perform this action',
      );
    }
  }

  // @Get('answers')
  // async handleGetAnswers(@Body('') id:string){
  //   await this.qAndAService.answers(id);
  // }

  // @Get('questions')
  // async handleGetQuestions(@Body() id:){

  // }
}
