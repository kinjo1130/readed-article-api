import { Injectable } from '@nestjs/common';
import { WebhookEvent, Client, MessageAPIResponseBase } from '@line/bot-sdk';
import { ConfigService as NestConfigService } from './config/config.service';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class LinebotService {
  private lineClient: Client;

  constructor(
    private configService: NestConfigService,
    private articlesService: ArticlesService,
  ) {
    this.lineClient = this.configService.createLinebotClient();
  }
  private isHttps(url: string): boolean {
    return url.startsWith('https://');
  }

  async handleEvent(event: WebhookEvent): Promise<MessageAPIResponseBase> {
    if (event.type === 'message') {
      const returnMessage: string =
        event.message.type === 'text'
          ? event.message.text
          : 'テキストではありませんでした。';
      console.log(returnMessage);
      // text以外のメッセージが送られてきた場合
      if (event.message.type !== 'text') {
        return await this.lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: returnMessage,
        });
      }

      if (this.isHttps(returnMessage)) {
        this.articlesService.addArticle({
          articleLink: returnMessage,
        });
        return await this.lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: 'DBに登録しました',
        });
      } else if (!this.isHttps(returnMessage)) {
        return await this.lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: 'httpsから始まるURLを送ってください',
        });
      }
    }
  }
}
