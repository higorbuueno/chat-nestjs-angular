import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './gateway/chat/chat.gateway';
import { Module } from '@nestjs/common';
import { ChatEvent } from './entities/chat-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEvent])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService]
})
export class ChatModule { }
