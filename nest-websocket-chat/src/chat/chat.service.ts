import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAllMessagesByRoom(roomId: number) {
    if (!roomId) {
      throw new BadRequestException("roomId is required");
    }

    return this.chatEventsRepository.createQueryBuilder('event')
    .leftJoinAndSelect('event.room', 'room')
    .leftJoinAndSelect('event.autor', 'autor')
    // TODO: Have a better way to avoid user informations?
    .select(['event.id', 'event.date', 'event.messageType', 'event.message', 'autor.id', 'autor.name'])
    .where('room.id = :roomId', { roomId })
    .getMany();
  }

  async create(chatEvent: ChatEventDto): Promise<ChatEvent> {
    return this.chatEventsRepository.save(chatEvent)
  }
}
