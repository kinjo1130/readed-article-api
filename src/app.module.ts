import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { LinebotModule } from './linebot/linebot.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ArticlesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    LinebotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
