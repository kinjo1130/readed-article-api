import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { OpenGraphScraperService } from 'src/open-graph-scraper/open-graph-scraper.service';
import { OpenGraphScraperModule } from 'src/open-graph-scraper/open-graph-scraper.module';

@Module({
  imports: [OpenGraphScraperModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, OpenGraphScraperService],
  exports: [ArticlesService],
})
export class ArticlesModule { }
