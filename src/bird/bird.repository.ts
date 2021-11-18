import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bird } from './interfaces/bird.interface';
import { BirdDoc } from './interfaces/bird-document.interface';
import { CreateBirdDTO } from './dto/bird.dto';

@Injectable()
export class BirdRepository {
    constructor(
        @InjectModel('Bird') private readonly birdModel: Model<BirdDoc>,
    ) {}

    async find(): Promise<Bird[]> {
        return await this.birdModel.find();
    }

    async create(createBirdDTO: CreateBirdDTO): Promise<Bird> {
        return await this.birdModel.create(createBirdDTO);
    }
}
