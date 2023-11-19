import { WebhookRequestBody } from '@line/bot-sdk';
import { Body, Controller, Post } from '@nestjs/common';
import { LinebotService } from './linebot.service';

@Controller('linebot')
export class LinebotController {
  constructor(private linebotService: LinebotService) { }

  @Post('/webhook')
  async handler(@Body() body: WebhookRequestBody) {
    const events = body.events;
    const handleEventPromises = events.map((event) =>
      this.linebotService.handleEvent(event),
    );
    await Promise.all(handleEventPromises);
  }
}
