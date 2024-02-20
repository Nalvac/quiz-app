import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OpenAI } from 'openai';

interface IQuiz {
  question: string;
  possibleResponses: string[];
  correctResponse: string;
}

interface ITheme {
  content: string;
}

@WebSocketGateway({ cors: true })
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  clients: { client: Socket; username?: string }[] = [];
  quiz: IQuiz[] = [];

  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.server.emit('message', payload);
    return 'Hello world!';
  }

  @SubscribeMessage('quiz')
  async handleChatMessage(client: any, payload: ITheme): Promise<void> {
    const result = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Peut-tu me donner un quiz à partir de ce thématique '${payload.content}'
            qui posséde une question et quatre réponse possibles et donne moi une réponse juste pour corriger ?
            donne moi ces informations directement sans aucune phrase supplémentaire'`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const quiz = result.choices[0].message.content;
    const question = quiz.split('\n')[0].replace('Question : ', '');
    const possibleResponses = quiz
      .split('\n')
      .slice(1)
      .filter(
        (line) =>
          line.trim() !== '' && // Exclude empty strings
          !line.includes('Réponses possibles :') &&
          !line.includes('Réponses:'),
      )
      .slice(0, 4);
    const correctResponse = quiz
      .split('\n\n')[2]
      .replace(/Réponse (correcte|juste) : /, '');

    this.quiz.push({
      question: question,
      possibleResponses: possibleResponses,
      correctResponse: correctResponse,
    });

    this.server.emit('quiz', {
      ...this.quiz,
    });
  }

  handleConnection(client: Socket) {
    console.log('client connected ', client.id);
    this.clients.push({
      client,
    });
  }

  handleDisconnect(client: any) {
    console.log('client disconnected ', client.id);
    this.clients = this.clients.filter((c) => c.client.id !== client.id);
  }
}
