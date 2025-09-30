"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.getLocation = exports.getLocations = exports.createLocation = void 0;
const location_model_1 = require("../data/mongo/models/location.model");
//CREATE
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLocation = yield location_model_1.LocationModel.create(req.body);
        res.status(201).json(newLocation);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid input data',
                details: error.message
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createLocation = createLocation;
// READ all location
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Filter
        const filters = {};
        if (req.query.name)
            filters.name = req.query.name;
        if (req.query.type)
            filters.type = req.query.type;
        if (req.query.dimension)
            filters.dimension = req.query.dimension;
        const filteredLocations = yield location_model_1.LocationModel.find(filters);
        res.json(filteredLocations);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving location' });
    }
});
exports.getLocations = getLocations;
//READ 1 location
const getLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const location = yield location_model_1.LocationModel.findOne({ id: Number(id) });
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error retrieving location' });
    }
});
exports.getLocation = getLocation;
const updateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedLocation = yield location_model_1.LocationModel.findOneAndUpdate({ id: Number(id) }, updateData, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(updatedLocation);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });
    }
});
exports.updateLocation = updateLocation;
//DELETE
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield location_model_1.LocationModel.findOneAndDelete({ id: Number(id) });
        if (!result) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Delete failed' });
    }
});
exports.deleteLocation = deleteLocation;
