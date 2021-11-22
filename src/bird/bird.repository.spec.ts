import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { BirdRepository } from './bird.repository';
import { BirdDocument } from './interfaces/bird.interface';
import { birdArray, birdDocArray, mockBird } from './__mocks__';

jest.mock('./bird.repository'); // Bird constructor mock

describe('Bird Repository', () => {
    let repository: BirdRepository;
    let model: Model<BirdDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BirdRepository,
                {
                    provide: getModelToken('Bird'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockBird()),
                        constructor: jest.fn().mockResolvedValue(mockBird()),
                        find: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<BirdRepository>(BirdRepository);
        model = module.get<Model<BirdDocument>>(getModelToken('Bird'));
    });

    it('should be call the Repository constructor class', () => {
        expect(BirdRepository).toHaveBeenCalledTimes(1);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all birds', async () => {
        jest.spyOn(model, 'find').mockResolvedValueOnce(birdDocArray as any);
        const birds = await model.find({});
        expect(birds).toEqual(birdArray);
    });

    it('should insert a new bird', async () => {
        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve(mockBird()),
        );

        const newBird = await model.create({
            name: 'name',
            description: 'description',
            images: ['img1'],
            thumbnail: 'thumb-img1',
            size: 'medium',
            coordinates: {},
            color: ['blue'],
            information: {},
        });
        expect(newBird).toEqual(mockBird());
    });
});
