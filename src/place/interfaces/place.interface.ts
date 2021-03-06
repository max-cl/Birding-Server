import { Types, Document } from 'mongoose';

export type PlaceDocument = Place & Document;

export interface Place {
    readonly _id?: Types.ObjectId;
    readonly title: string;
    readonly description: string;
    readonly images: Array<string>;
    readonly coordinates: Object;
    readonly createdAt: Date;
}
