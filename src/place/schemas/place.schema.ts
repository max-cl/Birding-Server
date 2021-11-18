import { Schema } from 'mongoose';

export const PlaceSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    images: { type: Array, require: false },
    coordinates: { type: Object, require: false },
    createdAt: { type: Date, default: Date.now },
});

// {
//     "title": "El Portillo",
//     "description": "On the edge of Mount Teide National Park is the Service Area of El Portillo, surrounded by broom bushes, laburnum and other vegetation that is exclusive to this area. There are several trails setting off from the Visitors Centre that will allow you to dis",
//     "coordinates": {
//         "latitude": 28.30361,
//         "longitude": -16.567
//     },
//     "images": ["el-portillo-1","el-portillo-2"]
// },
