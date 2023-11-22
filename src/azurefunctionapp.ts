import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import { AppModule } from './app.module';

let cachedServer: any;
async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    nestApp.enableCors();
    await nestApp.init();
    // enable swagger
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler = async (
  event: any,
  context: any,
  callback: any,
): Promise<any> => {
  const server = await bootstrap();
  return server(event, context, callback);
};
