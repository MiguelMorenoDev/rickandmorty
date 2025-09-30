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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const data_1 = require("../data");
const characters_json_1 = __importDefault(require("./characters.json"));
const MONGO_URI = process.env.MONGO_URI;
const API_DOMAIN = process.env.API_DOMAIN;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined as a enviroment variable');
}
if (!API_DOMAIN) {
    throw new Error('API_DOMAIN is not defined as a enviroment variable');
}
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        const mappedCharacters = characters_json_1.default.characters.map(character => ({
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type || "",
            gender: character.gender,
            image: character.image.replace('${process.env.API_DOMAIN}', API_DOMAIN),
            origin: {
                name: character.origin.name || "unknown",
                url: character.origin.url.replace('${process.env.API_DOMAIN}', API_DOMAIN)
            },
            location: {
                name: character.location.name || "unknown",
                url: character.location.url.replace('${process.env.API_DOMAIN}', API_DOMAIN)
            },
            episode: character.episode.map(ep => ep.replace('${process.env.API_DOMAIN}', API_DOMAIN)),
            url: character.url.replace('${process.env.API_DOMAIN}', API_DOMAIN),
            created: character.created
        }));
        yield data_1.CharacterModel.deleteMany({});
        yield data_1.CharacterModel.insertMany(mappedCharacters);
        console.log('Seed completed');
        yield mongoose_1.default.disconnect();
        console.log("MongoDB disconnected");
    }
    catch (error) {
        console.error('Data seed error', error);
    }
});
seed();
