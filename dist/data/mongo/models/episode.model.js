"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeModel = void 0;
const mongoose_1 = require("mongoose");
const episodeSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    air_date: { type: String, required: true },
    episodeCode: { type: String, required: true },
    characters: [{
            type: String,
        }],
    url: { type: String, default: "" },
    created: { type: Date, default: Date.now }
});
exports.EpisodeModel = (0, mongoose_1.model)('Episode', episodeSchema);
