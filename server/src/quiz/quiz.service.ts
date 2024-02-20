import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
@Injectable()
export class QuizService {
  constructor(private readonly openai: OpenAI) {}
}
