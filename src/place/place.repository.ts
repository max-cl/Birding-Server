import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { PlaceDocument } from './interfaces/place.interface';

@Injectable()
export class PlaceRepository extends EntityRepository<PlaceDocument> {
    constructor(@InjectModel('Place') placeModel: Model<PlaceDocument>) {
        super(placeModel);
    }
}
