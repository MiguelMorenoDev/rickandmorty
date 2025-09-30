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
exports.deleteCharacter = exports.updateCharacter = exports.getCharacter = exports.getCharacters = exports.createCharacter = void 0;
const data_1 = require("../data");
// CREATE
const createCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCharacter = yield data_1.CharacterModel.create(req.body);
        res.status(201).json(newCharacter);
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
exports.createCharacter = createCharacter;
// READ all characters
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {};
        if (req.query.name)
            filters.name = req.query.name;
        if (req.query.status)
            filters.status = req.query.status;
        if (req.query.species)
            filters.species = req.query.species;
        if (req.query.type)
            filters.type = req.query.type;
        if (req.query.gender)
            filters.gender = req.query.gender;
        const filteredCharacters = yield data_1.CharacterModel.find(filters);
        res.json(filteredCharacters);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving characters' });
    }
});
exports.getCharacters = getCharacters;
// READ 1 character
const getCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const character = yield data_1.CharacterModel.findOne({ id: Number(id) });
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(character);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error retrieving character' });
    }
});
exports.getCharacter = getCharacter;
const updateCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedCharacter = yield data_1.CharacterModel.findOneAndUpdate({ id: Number(id) }, updateData, { new: true });
        if (!updatedCharacter) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(updatedCharacter);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });
    }
});
exports.updateCharacter = updateCharacter;
// DELETE
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield data_1.CharacterModel.findOneAndDelete({ id: Number(id) });
        if (!result) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json({ message: 'Character deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Delete failed' });
    }
});
exports.deleteCharacter = deleteCharacter;
