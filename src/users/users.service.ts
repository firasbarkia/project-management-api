import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(email: string, password: string): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
