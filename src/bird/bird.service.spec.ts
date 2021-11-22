import { Test, TestingModule } from '@nestjs/testing';
import { BirdService } from './bird.service';
import { BirdRepository } from './bird.repository';
import { CreateBirdDTO } from './dto/bird.dto';
import { birdId, birdArray, mockBird } from './__mocks__';

describe('BirdRepository', () => {
    let service: BirdService;
    let repository: BirdRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BirdService],
            providers: [
                {
                    provide: BirdRepository,
                    useValue: {
                        find: jest.fn().mockResolvedValue(birdArray),
                        create: jest
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

        service = module.get<BirdService>(BirdService);
        repository = module.get<BirdRepository>(BirdRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('get All Birds', () => {
        it('get birds', async () => {
            const birds = await repository.find({});
            expect(birds).toEqual(birdArray);
        });
    });

    describe('create new Bird', () => {
        it('should create a new Bird', async () => {
            const createBirdDTO: CreateBirdDTO = mockBird();
            const newBird = await repository.create(createBirdDTO);
            expect(newBird).toEqual(createBirdDTO);
        });
    });
});
