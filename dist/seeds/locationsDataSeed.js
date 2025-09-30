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
const locations_json_1 = __importDefault(require("./locations.json"));
const location_model_1 = require("../data/mongo/models/location.model");
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
        const mappedLocations = locations_json_1.default.locations.map(location => ({
            id: location.id,
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            residents: location.residents.map(resident => resident.replace('${process.env.API_DOMAIN}', API_DOMAIN)),
            url: location.url.replace('${process.env.API_DOMAIN}', API_DOMAIN),
            created: location.created
        }));
        yield location_model_1.LocationModel.deleteMany({});
        yield location_model_1.LocationModel.insertMany(mappedLocations);
        console.log('Locations seed completed');
        yield mongoose_1.default.disconnect();
        console.log("MongoDB disconnected");
    }
    catch (error) {
        console.error('Locations seed error', error);
    }
});
seed();
