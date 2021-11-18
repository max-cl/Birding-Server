import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreatePlaceDTO } from './dto/place.dto';
import { Place } from './interfaces/place.interface';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    @Get()
    async getPlaces(@Res() res): Promise<Place[]> {
        const places = await this.placeService.getPlaces();
        return res.status(HttpStatus.OK).json(places);
    }

    @Post()
    async createPlace(@Res() res, @Body() createPlaceDTO: CreatePlaceDTO) {
        const place = await this.placeService.createPlace(createPlaceDTO);
        return res.status(HttpStatus.CREATED).json({
            message: 'Place has been created.',
            data: place,
        });
    }
}
