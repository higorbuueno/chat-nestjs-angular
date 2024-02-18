import { ChatEvent } from "src/chat/entities/chat-event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ChatEvent, chatEvent => chatEvent.room)
    chatEvents: ChatEvent[];
}
