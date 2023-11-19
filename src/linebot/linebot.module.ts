import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { ConfigService } from './config/config.service';
import { ArticlesModule } from 'src/articles/articles.module';
import { ArticlesService } from 'src/articles/articles.service';
import { OpenGraphScraperModule } from 'src/open-graph-scraper/open-graph-scraper.module';

@Module({
  imports: [ArticlesModule, OpenGraphScraperModule],
  providers: [LinebotService, ConfigService, ArticlesService],
  controllers: [LinebotController],
})
export class LinebotModule { }
