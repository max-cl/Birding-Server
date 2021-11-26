import { Test, TestingModule } from '@nestjs/testing';
import { PlaceService } from './place.service';
import { PlaceRepository } from './place.repository';
import { CreatePlaceDTO } from './dto/place.dto';
import { placeId, placeArray, mockPlace } from './__mocks__';

describe('PlaceRepository', () => {
    let service: PlaceService;
    let repository: PlaceRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceService],
            providers: [
                {
                    provide: PlaceRepository,
                    useValue: {
                        find: jest.fn().mockResolvedValue(placeArray),
                        create: jest
                            .fn()
                            .mockImplementation(
                                (createPlaceDTO: CreatePlaceDTO) =>
                                    Promise.resolve({
                                        _id: placeId,
                                        ...createPlaceDTO,
                                    }),
                            ),
                    },
                },
            ],
        }).compile();

        service = module.get<PlaceService>(PlaceService);
        repository = module.get<PlaceRepository>(PlaceRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get All Places', async () => {
        const places = await repository.find({});
        expect(places).toEqual(placeArray);
    });

    it('should create a new Place', async () => {
        const createPlaceDTO: CreatePlaceDTO = mockPlace();
        const newPlace = await repository.create(createPlaceDTO);
        expect(newPlace).toEqual(createPlaceDTO);
    });
});
