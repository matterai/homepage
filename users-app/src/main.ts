import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Constants } from './app/app.constants';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log'],
  });

  const config = app.get(ConfigService);
  const appPort = config.get<number>(Constants.APP_PORT);

  await app.listen(appPort);
}

bootstrap();
