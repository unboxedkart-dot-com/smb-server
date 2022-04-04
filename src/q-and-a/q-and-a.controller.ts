import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';
import { QAndAService } from './q-and-a.service';

@UseGuards(JwtAuthGuard)
@Controller('q-and-a')
export class QAndAController {
  constructor(private readonly qAndAService: QAndAService) {}

  @Post('create/question')
  async handleCreateQuestion(
    @Req() request: any,
    @Body() entireBody: CreateQuestionDto,
  ) {
    const userId = request.user.userId;
    const question = await this.qAndAService.createQuestion(
      userId,
      entireBody.question,
      entireBody.productId,
    );
    return 'question added';
  }

  @Post('/create/answer')
  async handleCreateAnswer(
    @Req() request: any,
    @Body() entireBody: CreateAnswerDto,
  ) {
    const userId = request.user.userId;
    await this.qAndAService.createAnswer(
      userId,
      entireBody.answer,
      entireBody.questionId,
    );
    return 'answer added';
  }

  @Post('approve/question/:id')
  async handleApproveQuestion(@Param('id') questionId: string) {
    await this.qAndAService.approveQuestion(questionId);
  }

  @Post('approve/answer/:id')
  async handleApproveAnswer(@Param('id') answerId: string) {
    await this.qAndAService.approveAnswer(answerId);
  }

  @Get(':id')
  async handleGetQuestionAndAnswers(@Param('id') productId: string) {
    const result = await this.qAndAService.getQuestionAndAnswers(productId);
    return result;
  }

  // @Get('answers')
  // async handleGetAnswers(@Body('') id:string){
  //   await this.qAndAService.answers(id);
  // }

  // @Get('questions')
  // async handleGetQuestions(@Body() id:){

  // }
}
