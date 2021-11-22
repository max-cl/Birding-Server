import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BirdDocument } from './interfaces/bird.interface';
import { EntityRepository } from '../database/entity.repository';

@Injectable()
export class BirdRepository extends EntityRepository<BirdDocument> {
    constructor(@InjectModel('Bird') birdModel: Model<BirdDocument>) {
        super(birdModel);
    }
}
