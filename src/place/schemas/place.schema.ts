import { Schema } from 'mongoose';

export const PlaceSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    images: { type: Array, require: false },
    coordinates: { type: Object, require: false },
    createdAt: { type: Date, default: Date.now },
});
