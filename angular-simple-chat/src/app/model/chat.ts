import { Mensagem } from "./mensagem";

export interface Chat {
    id?: number;
    sala?: string;
    data?: Date;
    ultimaMensagem?: Mensagem;
    lido?: boolean;
    ativo?: boolean;
    isGrupo?: boolean;
}