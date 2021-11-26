import { Types } from 'mongoose';
import { User } from '../interfaces/user.interface';

export const userId = new Types.ObjectId();
export const birdId = new Types.ObjectId();

export const mockUser = (
    _id = userId,
    data: {
        birdId: Types.ObjectId;
        checked: boolean;
        // createdAt: Date;
    }[] = [
        {
            birdId: birdId,
            checked: false,
            // createdAt: createdAt,
        },
        {
            birdId: birdId,
            checked: false,
            // createdAt: createdAt,
        },
    ],
): User => ({
    _id,
    data,
});

export const mockBirdsData = (
    data: {
        _id: Types.ObjectId;
        checked: boolean;
        // createdAt: Date;
    }[] = [
        {
            _id: birdId,
            checked: false,
            // createdAt: createdAt,
        },
        {
            _id: birdId,
            checked: false,
            // createdAt: createdAt,
        },
    ],
) => data;

export const mockData = (
    data: {
        birdId: Types.ObjectId;
        checked: boolean;
        // createdAt: Date;
    }[] = [
        {
            birdId: birdId,
            checked: false,
            // createdAt: createdAt,
        },
        {
            birdId: birdId,
            checked: false,
            // createdAt: createdAt,
        },
    ],
) => data;

export const userRetrieved = mockUser();
export const birdsRetrieved = mockBirdsData();
export const dataRetrieved = mockData();
