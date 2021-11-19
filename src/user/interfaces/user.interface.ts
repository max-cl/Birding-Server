import { Types, Document } from 'mongoose';

export type UserDocument = User & Document;

type IData = {
    readonly birdId: Types.ObjectId;
    readonly checked: boolean;
    readonly createdAt?: Date;
};

export interface User {
    readonly _id?: Types.ObjectId;
    readonly data: IData[];
}
