import { Document, Types } from 'mongoose';

type IData = {
    readonly birdId: Types.ObjectId;
    readonly checked: boolean;
    readonly createdAt?: Date;
};

export interface UserDoc extends Document {
    readonly _id?: Types.ObjectId;
    readonly data: IData[];
}
