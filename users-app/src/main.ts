import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Constants } from './app/app.constants';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log'],
  });

  const swaggerBuilder = new DocumentBuilder()
    .setTitle(`User app API`)
    .setDescription(`Service for users`)
    .setVersion(`1.0`)
    .addTag(`users`)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerBuilder);
  SwaggerModule.setup('api', app, swaggerDocument);

  const config = app.get(ConfigService);
  const appPort = config.get<number>(Constants.APP_PORT);

  await app.listen(appPort);
}

bootstrap();
