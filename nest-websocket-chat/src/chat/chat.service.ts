import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEvent } from './entities/chat-event.entity';
import { Repository } from 'typeorm';
import { ChatEventDto } from './dto/chat-event';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(ChatEvent)
    private chatEventsRepository: Repository<ChatEvent>,
  ) { }


  findAllMessagesByRoom(room: string) {
    return this.chatEventsRepository.findBy({
      sala: room
    })
  }


  async create(chatEvent: ChatEventDto): Promise<ChatEvent> {
    return this.chatEventsRepository.save(chatEvent)
  }
}
