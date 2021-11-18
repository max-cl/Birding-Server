import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDoc } from './interfaces/user-document.interface';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

const userId = new Types.ObjectId();
const birdId = new Types.ObjectId();
const mockUser = (
    _id = userId,
    data: {
        birdId: Types.ObjectId;
        checked: true;
        // createdAt: Date;
    }[] = [
        {
            birdId: birdId,
            checked: true,
            // createdAt: new Date('2021-10-05T12:58:52.085Z'),
        },
        {
            birdId: birdId,
            checked: true,
            // createdAt: new Date('2021-10-05T12:58:52.085Z'),
        },
    ],
): User => ({
    _id,
    data,
});

const mockUserDoc = (mock?: Partial<User>): Partial<UserDoc> => ({
    _id: mock?._id || userId,
    data: [
        {
            birdId: mock?.data[0]?.birdId || birdId,
            checked: mock?.data[0]?.checked || true,
            // createdAt:
            //     mock?.data[0]?.createdAt ||
            //     new Date('2021-10-05T12:58:52.085Z'),
        },
        {
            birdId: mock?.data[0]?.birdId || birdId,
            checked: mock?.data[0]?.checked || true,
            // createdAt:
            //     mock?.data[0]?.createdAt ||
            //     new Date('2021-10-05T12:58:52.085Z'),
        },
    ],
});

const userRetrieved = mockUser();
const userDocRetrieved = mockUserDoc();

const dataMock = [
    {
        birdId: birdId,
        checked: true,
        // createdAt: new Date('2021-10-05T12:58:52.085Z'),
    },
    {
        birdId: birdId,
        checked: true,
        // createdAt: new Date('2021-10-05T12:58:52.085Z'),
    },
];

describe('UserService', () => {
    let service: UserService;
    let model: Model<UserDoc>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken('User'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockUser()),
                        constructor: jest.fn().mockResolvedValue(mockUser()),
                        find: jest.fn(),
                        findById: jest.fn(),
                        update: jest.fn(),
                        insertMany: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        model = module.get<Model<UserDoc>>(getModelToken('User'));
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
    it('should return an user by id (token)', async () => {
        jest.spyOn(model, 'findById').mockResolvedValueOnce(
            userDocRetrieved as any,
        );
        const user = await service.getUser(userId as any);
        expect(user).toEqual(userRetrieved);
    });

    it('should insert a new User', async () => {
        jest.spyOn(model, 'insertMany').mockImplementationOnce(() =>
            Promise.resolve({
                _id: userId,
                data: dataMock,
            }),
        );

        const newUser = await service.createUser(dataMock);
        expect(newUser).toEqual(mockUser());
    });
});
