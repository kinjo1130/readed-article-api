import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { ConfigService } from './config/config.service';
import { ArticlesModule } from 'src/articles/articles.module';
import { ArticlesService } from 'src/articles/articles.service';

@Module({
  imports: [ArticlesModule],
  providers: [LinebotService, ConfigService, ArticlesService],
  controllers: [LinebotController],
})
export class LinebotModule { }
