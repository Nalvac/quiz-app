import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
@Injectable()
export class QuizService {

  constructor(private readonly openai: OpenAI) {
  }

  // Service pour la traduction des messages de la discussion
  async makeTranslate(text: string, language: string): Promise<string> {
    let data;
    try {
      data = await this.openai.chat.completions.create({
        messages: [{role: 'user', content: `Traduit ce text: '${text}' en '${language}' sans commentaire`}],
        model: 'gpt-3.5-turbo',
      });

      return data.choices[0].message.content;
    } catch (error) {
      console.error(error);
    }
  }



}
