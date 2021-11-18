import { Document, Types } from 'mongoose';

export interface PlaceDoc extends Document {
    readonly _id?: Types.ObjectId;
    readonly title: string;
    readonly description: string;
    readonly images: Array<string>;
    readonly coordinates: Object;
    readonly createdAt: Date;
}
