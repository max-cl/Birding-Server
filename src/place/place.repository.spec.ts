import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PlaceRepository } from './place.repository';
import { PlaceDocument } from './interfaces/place.interface';
import { placeArray, placeDocArray, mockPlace } from './__mocks__';

jest.mock('./place.repository'); // Place constructor mock

describe('Place Repository', () => {
    let repository: PlaceRepository;
    let model: Model<PlaceDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlaceRepository,
                {
                    provide: getModelToken('Place'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockPlace()),
                        constructor: jest.fn().mockResolvedValue(mockPlace()),
                        find: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<PlaceRepository>(PlaceRepository);
        model = module.get<Model<PlaceDocument>>(getModelToken('Place'));
    });

    it('should be call the Repository constructor class', () => {
        expect(PlaceRepository).toHaveBeenCalledTimes(1);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all places', async () => {
        jest.spyOn(model, 'find').mockResolvedValueOnce(placeDocArray as any);
        const places = await model.find({});
        expect(places).toEqual(placeArray);
    });

    it('should insert a new place', async () => {
        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve(mockPlace()),
        );

        const newPlace = await model.create({
            title: 'title',
            description: 'description',
            images: ['img1'],
            coordinates: {},
        });
        expect(newPlace).toEqual(mockPlace());
    });
});
