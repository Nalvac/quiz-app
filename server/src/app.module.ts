import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { RoomsModule } from './room/room.module';

@Module({
  imports: [QuizModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
