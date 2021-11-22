import { Types } from 'mongoose';
import { Bird, BirdDocument } from 'src/bird/interfaces/bird.interface';

export const birdId = new Types.ObjectId();

export const mockBird = (
    _id = birdId,
    name = 'name',
    description = 'description',
    images = ['img1'],
    thumbnail = 'thumb-img1',
    size = 'medium',
    coordinates = {},
    color = ['blue'],
    information = {},
    createdAt = '2021-11-21T16:19:57.634Z' as unknown as Date,
): Bird => ({
    _id,
    name,
    description,
    images,
    thumbnail,
    size,
    coordinates,
    color,
    information,
    createdAt,
});

export const mockBirdDoc = (mock?: Partial<Bird>): Partial<BirdDocument> => ({
    _id: mock?._id || birdId,
    name: mock?.name || 'name',
    description: mock?.description || 'description',
    images: mock?.images || ['img1'],
    thumbnail: mock?.thumbnail || 'thumb-img1',
    size: mock?.size || 'medium',
    coordinates: mock?.coordinates || {},
    color: mock?.color || ['blue'],
    information: mock?.information || {},
    createdAt:
        mock?.createdAt || ('2021-11-21T16:19:57.634Z' as unknown as Date),
});

export const birdArray = [mockBird(), mockBird(), mockBird()];

export const birdDocArray = [mockBirdDoc(), mockBirdDoc(), mockBirdDoc()];
