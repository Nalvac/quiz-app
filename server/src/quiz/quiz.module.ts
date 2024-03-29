import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { QuizController } from './quiz.controller';
import { QuizGateway } from './quiz.gateway';

dotenv.config();
@Module({
  controllers: [QuizController],
  providers: [QuizController, QuizGateway],
})
export class QuizModule {}
