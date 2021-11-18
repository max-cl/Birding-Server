import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { BirdService } from './bird.service';
import { BirdDoc } from './interfaces/bird-document.interface';
import { Bird } from './interfaces/bird.interface';

const birdId = new Types.ObjectId();

const mockBird = (
    _id = birdId,
    name = 'name',
    description = 'description',
    images = ['img1'],
    thumbnail = 'thumb-img1',
    checked = true,
    size = 'medium',
    coordinates = {},
    color = ['blue'],
    information = {},
    createdAt = new Date(),
): Bird => ({
    _id,
    name,
    description,
    images,
    thumbnail,
    checked,
    size,
    coordinates,
    color,
    information,
    createdAt,
});

const mockBirdDoc = (mock?: Partial<Bird>): Partial<BirdDoc> => ({
    _id: mock?._id || birdId,
    name: mock?.name || 'name',
    description: mock?.description || 'description',
    images: mock?.images || ['img1'],
    thumbnail: mock?.thumbnail || 'thumb-img1',
    checked: mock?.checked || true,
    size: mock?.size || 'medium',
    coordinates: mock?.coordinates || {},
    color: mock?.color || ['blue'],
    information: mock?.information || {},
    createdAt: mock?.createdAt || new Date(),
});

const birdArray = [mockBird(), mockBird(), mockBird()];

const birdDocArray = [mockBirdDoc(), mockBirdDoc(), mockBirdDoc()];

describe('BirdService', () => {
    let service: BirdService;
    let model: Model<BirdDoc>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BirdService,
                {
                    provide: getModelToken('Bird'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockBird()),
                        constructor: jest.fn().mockResolvedValue(mockBird()),
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

        service = module.get<BirdService>(BirdService);
        model = module.get<Model<BirdDoc>>(getModelToken('Bird'));
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
    it('should return all birds', async () => {
        jest.spyOn(model, 'find').mockResolvedValueOnce(birdDocArray as any);
        const birds = await service.getBirds();
        expect(birds).toEqual(birdArray);
    });

    it('should insert a new bird', async () => {
        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve({
                _id: birdId,
                name: 'name',
                description: 'description',
                images: ['img1'],
                thumbnail: 'thumb-img1',
                checked: true,
                size: 'medium',
                coordinates: {},
                color: ['blue'],
                information: {},
                createdAt: new Date(),
            }),
        );

        const newBird = await service.createBird({
            name: 'name',
            description: 'description',
            images: ['img1'],
            thumbnail: 'thumb-img1',
            checked: true,
            size: 'medium',
            coordinates: {},
            color: ['blue'],
            information: {},
        });
        expect(newBird).toEqual(
            mockBird(birdId, 'name', 'description', ['img1']),
        );
    });
});
