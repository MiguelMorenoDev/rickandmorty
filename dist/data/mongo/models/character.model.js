"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModel = void 0;
const mongoose_1 = require("mongoose");
const characterSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['Alive', 'Dead', 'unknown'], required: true },
    species: { type: String, required: true },
    type: { type: String, required: false },
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
exports.CharacterModel = (0, mongoose_1.model)('Character', characterSchema);
