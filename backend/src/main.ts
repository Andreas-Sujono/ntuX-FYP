import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

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
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
