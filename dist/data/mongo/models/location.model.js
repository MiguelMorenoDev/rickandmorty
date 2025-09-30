"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    dimension: { type: String, required: true },
    residents: [String],
    url: { type: String, default: "" },
    created: { type: Date, default: Date.now }
});
exports.LocationModel = (0, mongoose_1.model)('Location', locationSchema);
