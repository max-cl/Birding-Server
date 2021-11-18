import { Document, Types } from 'mongoose';

export interface BirdDoc extends Document {
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
