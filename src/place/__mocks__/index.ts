import { Types } from 'mongoose';
import { Place, PlaceDocument } from '../interfaces/place.interface';

export const placeId = new Types.ObjectId();

export const mockPlace = (
    _id = placeId,
    title = 'title',
    description = 'description',
    images = ['img1'],
    coordinates = {},
    createdAt = '2021-11-21T16:19:57.634Z' as unknown as Date,
): Place => ({
    _id,
    title,
    description,
    images,
    coordinates,
    createdAt,
});

export const mockBirdDoc = (mock?: Partial<Place>): Partial<PlaceDocument> => ({
    _id: mock?._id || placeId,
    title: mock?.title || 'title',
    description: mock?.description || 'description',
    images: mock?.images || ['img1'],
    coordinates: mock?.coordinates || {},
    createdAt:
        mock?.createdAt || ('2021-11-21T16:19:57.634Z' as unknown as Date),
});

export const placeArray = [mockPlace(), mockPlace(), mockPlace()];
export const placeDocArray = [mockBirdDoc(), mockBirdDoc(), mockBirdDoc()];
