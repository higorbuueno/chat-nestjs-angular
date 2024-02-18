import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get("messages-by-room")
  findAllMessagesByRoom(
    @Query() params: any
  ) {
    return this.chatService.findAllMessagesByRoom(params.roomId);
  }

}
