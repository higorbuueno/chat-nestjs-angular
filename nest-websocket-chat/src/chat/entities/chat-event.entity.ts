import { MessageType } from 'src/enum/message-type.enum';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ChatEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.chatEvents)
    @JoinColumn({ name: 'autorId', referencedColumnName: 'id' })
    autor: User;

    @Column({nullable: true})
    message: string;

    @Column()
    date: Date;

    @ManyToOne(() => Room, room => room.chatEvents)
    @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
    room: Room;

    @Column({ type: "enum", enum: MessageType, default: MessageType.MESSAGE })
    messageType: MessageType;
}