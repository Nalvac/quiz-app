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

  // Service de validation d'une information (Si l'affirmation passé en paramètre est vrai ou fausse)
  async validateInformation(information: string): Promise<boolean> {
    try {
      const data = await this.openai.chat.completions.create({
        messages: [
          { role: 'user', content: `Est-ce que l'information suivante est correcte : '${information}' ? repond par vrai ou faux` },
        ],
        model: 'gpt-3.5-turbo',
      });

      const response = data.choices[0].message.content.toLowerCase();
      console.log(response);
      return response.includes('vrai') || response.includes('correct');
    } catch (error) {
      console.error(error);
    }
  }
}
