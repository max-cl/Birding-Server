import { Types } from 'mongoose';

type IData = {
    readonly birdId: Types.ObjectId;
    readonly checked: boolean;
    readonly createdAt?: Date;
};

export interface User {
    readonly _id?: Types.ObjectId;
    readonly data: IData[];
}
