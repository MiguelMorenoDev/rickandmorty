
import {Schema, model } from 'mongoose';
import { ICharacter } from '../../../interfaces/character.interface';

const characterSchema = new Schema<ICharacter>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['Alive', 'Dead', 'unknown'],required: true },
    species: { type: String, required: true },
    type: { type: String, required: false},
    gender: { type: String, enum: ['Female', 'Male', 'Genderless', 'unknown'], required: true },

    origin: { 
        name: String,
        url: String
    },

    location: {
        name: String,
        url: String
    },

    image: { type: String, required: true },

    episode: [{
        type: String,
        required: true
    }],

    url: { type: String, default: "" },

    created: { type: String }

});

export const CharacterModel = model<ICharacter>('Character', characterSchema );