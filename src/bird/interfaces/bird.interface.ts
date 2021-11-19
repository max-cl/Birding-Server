import { Types, Document } from 'mongoose';

export type BirdDocument = Bird & Document;

export interface Bird {
    readonly _id?: Types.ObjectId;
    readonly name: string;
    readonly description: string;
    readonly images: Array<string>;
    readonly thumbnail: string;
    readonly size: string;
    readonly coordinates: Object;
    readonly color: Array<string>;
    readonly information: Object;
    readonly createdAt: Date;
}
