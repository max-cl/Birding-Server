import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { PlaceDoc } from './interfaces/place-document.interface';
import { Place } from './interfaces/place.interface';
import { PlaceService } from './place.service';

const placeId = new Types.ObjectId();

const mockPlace = (
    _id = placeId,
    title = 'title',
    description = 'description',
    images = ['img1'],
    coordinates = {},
    createdAt = new Date(),
): Place => ({
    _id,
    title,
    description,
    images,
    coordinates,
    createdAt,
});

const mockBirdDoc = (mock?: Partial<Place>): Partial<PlaceDoc> => ({
    _id: mock?._id || placeId,
    title: mock?.title || 'title',
    description: mock?.description || 'description',
    images: mock?.images || ['img1'],
    coordinates: mock?.coordinates || {},
    createdAt: mock?.createdAt || new Date(),
});

const placeArray = [mockPlace(), mockPlace(), mockPlace()];
const placeDocArray = [mockBirdDoc(), mockBirdDoc(), mockBirdDoc()];

describe('PlaceService', () => {
    let service: PlaceService;
    let model: Model<PlaceDoc>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlaceService,
                {
                    provide: getModelToken('Place'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockPlace()),
                        constructor: jest.fn().mockResolvedValue(mockPlace()),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<PlaceService>(PlaceService);
        model = module.get<Model<PlaceDoc>>(getModelToken('Place'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // In all the spy methods/mock methods we need to make sure to
    // add in the property function exec and tell it what to return
    // this way all of our mongo functions can and will be called
    // properly allowing for us to successfully test them.
    it('should return all places', async () => {
        jest.spyOn(model, 'find').mockResolvedValueOnce(placeDocArray as any);
        const places = await service.getPlaces();
        expect(places).toEqual(placeArray);
    });

    it('should insert a new Place', async () => {
        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve({
                _id: placeId,
                title: 'title',
                description: 'description',
                images: ['img1'],
                coordinates: {},
                createdAt: new Date(),
            }),
        );

        const newPlace = await service.createPlace({
            title: 'title',
            description: 'description',
            images: ['img1'],
            coordinates: {},
        });
        expect(newPlace).toEqual(mockPlace());
    });
});
