import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('NTUX API')
    .setDescription('NTUX API description')
    .setVersion('1.0')
    .addTag('ntux')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  // app.use(csurf());
  app.use(helmet());
  app.setGlobalPrefix(`${process.env.PATH_PREFIX || ''}api/v1`);
  app.use(json({ limit: '999mb' }));
  app.use(urlencoded({ extended: true, limit: '999mb' }));

  await app.listen(3000);
}
bootstrap();
