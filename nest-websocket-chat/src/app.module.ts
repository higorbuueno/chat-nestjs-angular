import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEvent } from './chat/entities/chat-event.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import * as path from 'path';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [ChatEvent, User],
        synchronize: configService.get<boolean>("DB_SYNCHRONIZATION"),
      })
    }),
    ChatModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * The JWT warden protect all routes bollow him, so, in this case, in the AppModule, it will protect all the application
     */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
