import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEvent } from './chat/entities/chat-event.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

if (process.env.NODE_ENV === 'production') {

  // package.json:
  // 
  // "scripts": {
  //   "start:prod": "NODE_ENV=production nest start --env production"
  // }

  config({ path: path.resolve(__dirname, '../.env.production') });
} else {
  config();
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ChatModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [ChatEvent],
        synchronize: configService.get<boolean>("DB_SYNCHRONIZATION"),
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
