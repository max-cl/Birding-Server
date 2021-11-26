import { Test, TestingModule } from '@nestjs/testing';
import { BirdService } from '../bird/bird.service';
import { CreateUserDTO } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
    birdsRetrieved,
    dataRetrieved,
    mockData,
    userId,
    userRetrieved,
} from './__mocks__';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;
    const mockResponse = () => {
        const res = { status: undefined, json: {} };
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getUser: jest.fn().mockResolvedValue(userRetrieved),
                        createUser: jest
                            .fn()
                            .mockImplementation(
                                (createUserDTO: CreateUserDTO[]) =>
                                    Promise.resolve([
                                        {
                                            _id: userId,
                                            data: createUserDTO,
                                        },
                                    ]),
                            ),
                    },
                },
                {
                    provide: BirdService,
                    useValue: {
                        getBirds: jest.fn().mockResolvedValue(birdsRetrieved),
                    },
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        it('should 200 and get an User', async () => {
            const res = mockResponse();
            await service.getUser(userId as any);
            await controller.getUser(res, userId as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(userRetrieved);
        });
    });

    describe('new User', () => {
        it('should create a new User', async () => {
            const res = mockResponse();
            await service.createUser(mockData());
            await controller.createUser(res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User has been created.',
                data: dataRetrieved,
                token: userId.toString(),
            });
        });
    });
});
