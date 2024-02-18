import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OpenAI } from 'openai';

interface IMessage {
  username: string;
  content: string;
  language: string;
  timeSent: string;
}

interface IQuiz {
  question: string;
  possibleResponses: Object;
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
  chatMessages: IMessage[] = [];
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
    client.emit('messages-old', this.chatMessages);
  }

  @SubscribeMessage('message-suggest')
  async handleMessageSuggestion(client: any, payload: IMessage): Promise<void> {
    const getSuggestions = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `J'écris un message, donne moi les suggestions à partir de ça : '${payload.content}' retourne moi que des suggestions sans rien d'autre`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const result = getSuggestions.choices[0].message.content;
    this.server.emit(
      'message-suggest',
      result.split('\n').map((item) => item.replace(/^\d+\.\s/, '')),
    );
  }

  handleDisconnect(client: any) {
    console.log('client disconnected ', client.id);
    this.clients = this.clients.filter((c) => c.client.id !== client.id);
  }
}
