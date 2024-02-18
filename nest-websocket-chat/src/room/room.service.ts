import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Any, ArrayContains, In, Repository } from 'typeorm';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room)
    private _roomsRepository: Repository<Room>,
  ) { }


  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll() {
    return this._roomsRepository.find();
  }

  async findRoomsByUser(userId: number) {

    if (!userId) {
      throw new BadRequestException("userId is required");
    }

    return this._roomsRepository.find({
      where: {
        participants: {
          id: userId
        }
      }, relations: ['lastChatEvent']
    })
  }

  async findOne(id: number) {
    const room: Room = await this._roomsRepository.findOne({ where: { id: id }, relations: ['lastChatEvent'] });

    if (room) {
      return room;
    }

    throw new NotFoundException("Room not found");
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
