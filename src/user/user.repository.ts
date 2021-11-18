import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserDoc } from './interfaces/user-document.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private userModel: Model<UserDoc>) {}

    // Get User Data By UserID (Token)
    async findById(getUserDTO: GetUserDTO): Promise<User> {
        return await this.userModel.findById(getUserDTO);
    }

    // Create User
    async insertMany(createUserDTO: CreateUserDTO[]): Promise<User> {
        return await this.userModel.insertMany({ data: createUserDTO });
    }

    // Update User checked (Bird)
    async updateOne(updateUserDTO: UpdateUserDTO) {
        const { token, birdId, checked } = updateUserDTO;
        return await this.userModel.updateOne(
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
