import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { BirdController } from './bird.controller';
import { BirdService } from './bird.service';
import { CreateBirdDTO } from './dto/bird.dto';
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
    createdAt = new Date('2021-10-05T12:58:52.085Z'),
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

const birdArray: Bird[] = [
    mockBird(),
    mockBird(birdId, 'name', 'description'),
    mockBird(birdId, 'name', 'description'),
];

describe('BirdController', () => {
    let controller: BirdController;
    let service: BirdService;
    const mockResponse = () => {
        const res = { status: undefined, json: {} };
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BirdController],
            providers: [
                {
                    provide: BirdService,
                    useValue: {
                        getBirds: jest.fn().mockResolvedValue(birdArray),

                        createBird: jest
                            .fn()
                            .mockImplementation(
                                (createBirdDTO: CreateBirdDTO) =>
                                    Promise.resolve({
                                        _id: birdId,
                                        ...createBirdDTO,
                                    }),
                            ),
                    },
                },
            ],
        }).compile();

        controller = module.get<BirdController>(BirdController);
        service = module.get<BirdService>(BirdService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getBirds', () => {
        it('should 200 and get an array of birds', async () => {
            // const birds = await controller.getBirds(res);
            // expect(birds).toEqual(birdArray);
            const res = mockResponse();
            await controller.getBirds(res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(birdArray);
        });
    });

    describe('new Bird', () => {
        it('should create a new Bird', async () => {
            const res = mockResponse();
            const createBirdDTO: CreateBirdDTO = mockBird();
            await controller.createBird(res, createBirdDTO);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                data: birdArray[0],
                message: 'Bird has been created.',
            });
        });
    });
});
