import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    autor: string;

    @Column()
    texto: string;

    @Column()
    data: Date;

    @Column()
    sala: string;

    @Column()
    joiningAutor: boolean;

    @Column()
    leavingAutor: boolean;
}