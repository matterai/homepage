import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Constants } from './app.constants';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Constants.POSTGRES_HOST),
        port: +configService.get(Constants.POSTGRES_PORT),
        username: configService.get(Constants.POSTGRES_USERNAME),
        password: configService.get(Constants.POSTGRES_PASSWORD),
        database: configService.get(Constants.POSTGRES_DATABASE),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: configService.get(Constants.APP_ENV) === 'dev',
        namingStrategy: new SnakeNamingStrategy(),
      }),
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
