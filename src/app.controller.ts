import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }
  // 疎通確認用で置いているだけ
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
