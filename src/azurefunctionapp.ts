import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express from 'express';
import { AppModule } from './app.module';

let cachedServer: any;

/** Enable swagger */
function setupSwaggerDocument(app) {
  const config = new DocumentBuilder()
    .setTitle('editly-video-maker')
    .setDescription('editly-video-maker')
    .setVersion('1.0')
    .addTag('editly-video-maker')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger-ui', app, document);
}

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
    setupSwaggerDocument(nestApp);
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
