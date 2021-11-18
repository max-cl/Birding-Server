import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreatePlaceDTO } from './dto/place.dto';
import { Place } from './interfaces/place.interface';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

const placeId = new Types.ObjectId();

const mockPlace = (
    _id = placeId,
    title = 'title',
    description = 'description',
    images = ['img1'],
    coordinates = {},
    createdAt = new Date('2021-10-05T12:58:52.085Z'),
): Place => ({
    _id,
    title,
    description,
    images,
    coordinates,
    createdAt,
});

const placeArray: Place[] = [mockPlace(), mockPlace(), mockPlace()];

describe('PlaceController', () => {
    let controller: PlaceController;
    let service: PlaceService;
    const mockResponse = () => {
        const res = { status: undefined, json: {} };
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceController],
            providers: [
                {
                    provide: PlaceService,
                    useValue: {
                        getPlaces: jest.fn().mockResolvedValue(placeArray),
                        createPlace: jest
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

        controller = module.get<PlaceController>(PlaceController);
        service = module.get<PlaceService>(PlaceService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getPlaces', () => {
        it('should 200 and get an array of places', async () => {
            const res = mockResponse();
            await controller.getPlaces(res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(placeArray);
        });
    });

    describe('new Place', () => {
        it('should create a new Bird', async () => {
            const res = mockResponse();
            const createPlaceDTO: CreatePlaceDTO = mockPlace();
            await controller.createPlace(res, createPlaceDTO);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                data: placeArray[0],
                message: 'Place has been created.',
            });
        });
    });
});
