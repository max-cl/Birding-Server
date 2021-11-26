import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserDTO, GetUserDTO } from './dto/user.dto';
import { userId, mockUser, userRetrieved, mockData } from './__mocks__';

describe('UserRepository', () => {
    let service: UserService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserService],
            providers: [
                {
                    provide: UserRepository,
                    useValue: {
                        findById: jest.fn().mockResolvedValue(mockUser()),
                        insertMany: jest
                            .fn()
                            .mockImplementation((dataMock: CreateUserDTO[]) =>
                                Promise.resolve({
                                    _id: userId,
                                    data: dataMock,
                                }),
                            ),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get an user by Id', async () => {
        const user = await repository.findById(userId as unknown as GetUserDTO);
        expect(user).toEqual(userRetrieved);
    });

    it('should create a new User', async () => {
        const createUserDTO: CreateUserDTO[] = mockData();
        const newUser = await repository.insertMany(createUserDTO);
        expect(newUser).toEqual(mockUser());
    });
});
