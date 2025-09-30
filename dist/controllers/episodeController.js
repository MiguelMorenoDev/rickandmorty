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
exports.deleteEpisode = exports.updateEpisode = exports.getEpisode = exports.getEpisodes = exports.createEpisode = void 0;
const episode_model_1 = require("../data/mongo/models/episode.model");
//CREATE
const createEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEpisode = yield episode_model_1.EpisodeModel.create(req.body);
        res.status(201).json(newEpisode);
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
exports.createEpisode = createEpisode;
//READ all episodes
const getEpisodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Filter
        const filters = {};
        if (req.query.name)
            filters.name = req.query.name;
        if (req.query.episodeCode)
            filters.episodeCode = req.query.episodeCode;
        const filteredEpisodes = yield episode_model_1.EpisodeModel.find(filters);
        res.json(filteredEpisodes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving location' });
    }
});
exports.getEpisodes = getEpisodes;
//Read 1 Episode
const getEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const episode = yield episode_model_1.EpisodeModel.findOne({ id: Number(id) });
    try {
        if (!episode) {
            return res.status(400).json({ error: 'Episode not found' });
        }
        res.json(episode);
    }
    catch (error) {
        return res.status(400).json({ error: 'Error retrieving episode' });
    }
});
exports.getEpisode = getEpisode;
const updateEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedEpisode = yield episode_model_1.EpisodeModel.findOneAndUpdate({ id: Number(id) }, updateData, { new: true });
        if (!updatedEpisode) {
            return res.status(404).json({ error: 'Episode not found' });
        }
        res.json(updatedEpisode);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });
    }
});
exports.updateEpisode = updateEpisode;
//DELETE
const deleteEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield episode_model_1.EpisodeModel.findOneAndDelete({ id: Number(id) });
        if (!result) {
            return res.status(404).json({ message: 'Episode not found' });
        }
        res.json({ message: 'Episode deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Delete failed' });
    }
});
exports.deleteEpisode = deleteEpisode;
