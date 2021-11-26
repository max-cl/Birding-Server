import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository';
import { UserDocument } from './interfaces/user.interface';
import { mockData, mockUser, userId, userRetrieved } from './__mocks__';

jest.mock('./user.repository'); // User constructor mock

describe('User Repository', () => {
    let repository: UserRepository;
    let model: Model<UserDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: getModelToken('Place'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockUser()),
                        constructor: jest.fn().mockResolvedValue(mockUser()),
                        findById: jest.fn(),
                        insertMany: jest.fn(),
                        updateOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<UserRepository>(UserRepository);
        model = module.get<Model<UserDocument>>(getModelToken('Place'));
    });

    it('should be call the Repository constructor class', () => {
        expect(UserRepository).toHaveBeenCalledTimes(1);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an user by id (token)', async () => {
        jest.spyOn(model, 'findById').mockResolvedValueOnce(
            userRetrieved as UserDocument,
        );
        const user = await model.findById(userId as any);
        expect(user).toEqual(userRetrieved);
    });

    it('should insert a new User', async () => {
        jest.spyOn(model, 'insertMany').mockImplementationOnce(() =>
            Promise.resolve({
                _id: userId,
                data: mockData(),
            }),
        );

        const newUser = await model.insertMany(mockData());
        expect(newUser).toEqual(mockUser());
    });
});
