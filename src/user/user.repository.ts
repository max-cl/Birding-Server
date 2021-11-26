import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { UserDocument } from './interfaces/user.interface';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel('User') userModel: Model<UserDocument>) {
        super(userModel);
    }
}
