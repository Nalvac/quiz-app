import { Module } from '@nestjs/common';

import OpenAI from "openai";
import * as process from "process";
import * as dotenv from 'dotenv';
import {QuizController} from "./quiz.controller";
import {QuizGateway} from "./quiz.gateway";
import {QuizService} from "./quiz.service";

dotenv.config();
@Module({
  controllers: [QuizController],
  providers: [QuizController, QuizGateway, { provide: OpenAI, useValue: new OpenAI({apiKey: process.env["OPENAI_API_KEY"]}) }]
})
export class QuizModule {}
