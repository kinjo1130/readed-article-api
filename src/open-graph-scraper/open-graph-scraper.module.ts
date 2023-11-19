import { Module } from '@nestjs/common';
import { OpenGraphScraperService } from './open-graph-scraper.service';

@Module({
  providers: [OpenGraphScraperService],
  exports: [OpenGraphScraperService],
})
export class OpenGraphScraperModule { }
