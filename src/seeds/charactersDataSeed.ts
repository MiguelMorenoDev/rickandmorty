import "dotenv/config";
import mongoose from "mongoose";
import { CharacterModel } from "../data";
import charactersData from "./characters.json";

const MONGO_URI = process.env.MONGO_URI;
const API_DOMAIN = process.env.API_DOMAIN;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined as a enviroment variable');
}

if (!API_DOMAIN) {
    throw new Error('API_DOMAIN is not defined as a enviroment variable');
}

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const mappedCharacters = charactersData.characters.map(character => ({
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
        
        await CharacterModel.deleteMany({});
        await CharacterModel.insertMany(mappedCharacters);
        console.log('Seed completed');
       
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
       
    } catch (error) {
        console.error('Data seed error', error);
    }
}
seed();