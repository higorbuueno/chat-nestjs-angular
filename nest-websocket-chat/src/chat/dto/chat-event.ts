import { ChatEventUserDto } from "src/user/dto/user-chat-event.dto";

export interface ChatEventDto {
    autor: ChatEventUserDto;
    texto: string;
    data: Date;
    sala: string;
    joiningAutor?: boolean;
    leavingAutor?: boolean;
}