import { Module } from '@nestjs/common';
import { QAndAService } from './q-and-a.service';
import { QAndAController } from './q-and-a.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from 'src/models/answer.model';
import { QuestionAndAnswerSchema } from 'src/models/q_and_a.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Answer', schema: AnswerSchema },
      { name: 'QuestionAndAnswer', schema: QuestionAndAnswerSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [QAndAController],
  providers: [QAndAService, JwtAuthGuard],
})
export class QAndAModule {}
