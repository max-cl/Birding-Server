import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaceDTO } from './dto/place.dto';
import { PlaceDoc } from './interfaces/place-document.interface';
import { Place } from './interfaces/place.interface';

@Injectable()
export class PlaceRepository {
    constructor(
        @InjectModel('Place') private readonly placeModel: Model<PlaceDoc>,
    ) {}

    async find(): Promise<Place[]> {
        return await this.placeModel.find();
    }

    async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        return await this.placeModel.create(createPlaceDTO);
    }
}
