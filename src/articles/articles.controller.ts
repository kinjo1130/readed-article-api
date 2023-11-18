import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AddArticleDto } from './dto/requestAdd.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }
  @Post('add')
  addArticle(@Body() data: AddArticleDto) {
    return this.articlesService.addArticle(data);
  }
  @Get('lists')
  getArticleList(@Query('to') to: string) {
    return this.articlesService.getArticleLists(to);
  }
}
