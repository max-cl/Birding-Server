import { Injectable } from '@nestjs/common';
import { Bird } from './interfaces/bird.interface';
import { CreateBirdDTO } from './dto/bird.dto';
import { BirdRepository } from './bird.repository';

@Injectable()
export class BirdService {
    constructor(private readonly birdRepository: BirdRepository) {}

    async getBirds(): Promise<Bird[]> {
        return await this.birdRepository.find({});
    }

    async createBird(createBirdDTO: CreateBirdDTO): Promise<Bird> {
        return await this.birdRepository.create(createBirdDTO);
    }
}
