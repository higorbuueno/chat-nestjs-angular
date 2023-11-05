export interface ChatEventDto {
    autor: string;
    texto: string;
    data: Date;
    sala: string;
    joiningAutor?: boolean;
    leavingAutor?: boolean;
}