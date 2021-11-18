import { Schema } from 'mongoose';

export const BirdSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    images: { type: Array, require: false },
    thumbnail: { type: String, require: false },
    size: { type: String, require: false },
    coordinates: { type: Object, require: false },
    color: { type: Array, require: false },
    information: { type: Object, require: false },
    createdAt: { type: Date, default: Date.now },
});
