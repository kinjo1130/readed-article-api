import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';

const PORT = 5002;
const server = express();
export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  // CORS
  app.enableCors();
  const configService = app.get(ConfigService);
  const adminConfig = {
    projectId: configService.get<string>('PROJECT_ID'),
    privateKey: configService.get<string>('PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('CLIENT_EMAIL'),
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
  await app.listen(PORT);
  console.log(`Server is running on port http://localhost:${PORT}`);
};
createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '2GB',
  })
  .region('asia-northeast2')
  .https.onRequest(server);
