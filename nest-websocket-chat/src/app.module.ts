import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEvent } from './chat/entities/chat-event.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chat',
      entities: [ChatEvent],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) { }
}
