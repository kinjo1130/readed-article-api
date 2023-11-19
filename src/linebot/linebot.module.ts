import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { ConfigService } from './config/config.service';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [ArticlesModule],
  providers: [LinebotService, ConfigService],
  controllers: [LinebotController],
})
export class LinebotModule { }
