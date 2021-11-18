import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserDoc } from './interfaces/user-document.interface';
import { User } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUser(getUserDTO: GetUserDTO): Promise<User> {
        return await this.userRepository.findById(getUserDTO);
    }

    async createUser(createUserDTO: CreateUserDTO[]): Promise<User> {
        return await this.userRepository.insertMany(createUserDTO);
    }

    async updateCheckedBird(updateUserDTO: UpdateUserDTO) {
        return await this.userRepository.updateOne(updateUserDTO);
    }
}
