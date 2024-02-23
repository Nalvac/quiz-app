import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class RoomsService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateQuestions(
    themes: string[],
    numQuestions: number,
  ): Promise<
    {
      question: string;
      possibleResponses: string[];
      correctAnswer: string;
    }[]
  > {
    const quizPromises = themes.map(async (theme) => {
      const results = await Promise.all(
        Array.from({ length: numQuestions }, async (_, index) => {
          const result = await this.openai.chat.completions.create({
            messages: [
              {
                role: 'user',
                content: `Générer une question de quiz basée sur le thème : ${theme} (Question ${index + 1})
                  qui a une question et quatre réponses possibles, et donnez-moi la réponse correcte ?
                  fournissez-moi ces informations directement sans aucune phrase supplémentaire`,
              },
            ],
            model: 'gpt-3.5-turbo',
          });

          const quiz = result.choices[0].message.content;
          const question = quiz.split('\n')[0].replace('Question: ', '');
          const possibleResponses = quiz
            .split('\n')
            .slice(1)
            .filter(
              (line) =>
                line.trim() !== '' && // Exclude empty strings
                !line.includes('Réponses possibles :') &&
                !line.includes('Réponses:') &&
                !line.includes('Réponses :'),
            )
            .slice(0, 4);

          const correctAnswer = quiz
            .split('\n')
            .find((line) => line.includes('Réponse correcte :'))
            .replace('Réponse correcte : ', '');

          return {
            question,
            possibleResponses,
            correctAnswer,
          };
        }),
      );

      return results;
    });

    return Promise.all(quizPromises).then((results) => results.flat());
  }
}
