import { Injectable } from '@nestjs/common';
import { CreatePlaceDTO } from './dto/place.dto';
import { Place } from './interfaces/place.interface';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
    constructor(private readonly placeRepository: PlaceRepository) {}

    async getPlaces(): Promise<Place[]> {
        return await this.placeRepository.find({});
    }

    async createPlace(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        return await this.placeRepository.create(createPlaceDTO);
    }
}
