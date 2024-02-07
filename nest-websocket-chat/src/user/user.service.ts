import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    // Make a password hash
    const user: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    // Saving user
    let createdUser: User;
    try {
      createdUser = await this._userRepository.save(user);
    } catch (error) {
      // Validating if has a duplicated entry in database (the only unique are id and email)
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email já cadastrado');
      } else {
        throw new BadRequestException('Email já cadastrado');
      }
    }

    // Removing password and returning
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return this._userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this._userRepository.find();
  }

}
