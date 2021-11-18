import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    data: [
        {
            birdId: { type: String, require: true },
            checked: { type: Boolean, require: false },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});
