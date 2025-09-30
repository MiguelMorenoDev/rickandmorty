
import {Schema, model } from 'mongoose';
import { ILocation } from '../../../interfaces/location.interface';

const locationSchema = new Schema<ILocation>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    dimension: { type: String, required: true },
    residents: [String],
    url: { type: String, default: "" },
    created: { type: Date, default: Date.now }

});

export const LocationModel = model<ILocation>('Location', locationSchema );