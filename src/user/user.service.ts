import { Injectable } from '@nestjs/common';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from './dto/user.dto';
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
        const { token, birdId, checked } = updateUserDTO;
        return await this.userRepository.updateOne(
            {
                _id: token,
                'data.birdId': birdId,
            },
            {
                $set: {
                    'data.$.checked': checked,
                },
            },
        );
    }
}
