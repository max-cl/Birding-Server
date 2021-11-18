import { Module } from '@nestjs/common';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceService } from './place.service';
import { PlaceSchema } from './schemas/place.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
    ],
    controllers: [PlaceController],
    providers: [PlaceService, PlaceRepository],
})
export class PlaceModule {}
