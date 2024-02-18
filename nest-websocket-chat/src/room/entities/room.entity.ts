import { ChatEvent } from "src/chat/entities/chat-event.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
        
    @Column()
    isGroup: boolean;
    
    @OneToMany(() => ChatEvent, chatEvent => chatEvent.autor)
    chatEvents: ChatEvent[];

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];

    @ManyToOne(() => ChatEvent)
    @JoinColumn({ name: 'lastChatEventId' })
    lastChatEvent: ChatEvent | null;
}
