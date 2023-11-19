import { Injectable } from '@nestjs/common';
import { WebhookEvent, Client, MessageAPIResponseBase } from '@line/bot-sdk';
import { ConfigService as NestConfigService } from './config/config.service';

@Injectable()
export class LinebotService {
  private lineClient: Client;

  constructor(private configService: NestConfigService) {
    this.lineClient = this.configService.createLinebotClient();
  }

  async handleEvent(event: WebhookEvent): Promise<MessageAPIResponseBase> {
    if (event.type === 'message') {
      const returnMessage: string =
        event.message.type === 'text'
          ? event.message.text
          : 'テキストではありませんでした。';
      return await this.lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: returnMessage,
      });
    }
  }
}
