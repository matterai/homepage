import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Constants } from './app.constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const appPort = config.get<number>(Constants.APP_PORT);

  await app.listen(appPort);
}

bootstrap();
