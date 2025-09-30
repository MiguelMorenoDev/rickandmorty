import "dotenv/config";
import mongoose from "mongoose";
import episodesData from "./episodes.json";
import { EpisodeModel } from '../data/mongo/models/episode.model';


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
        const mappedEpisodes = episodesData.episodes.map(episode => ({
            id: episode.id,
            name: episode.name,
            air_date: episode.air_date,
            episodeCode: episode.episodeCode,
            characters: episode.characters.map(char => char.replace('${process.env.API_DOMAIN}', API_DOMAIN)),
            url: episode.url.replace('${process.env.API_DOMAIN}', API_DOMAIN),
            created: episode.created
        }));
        
        await EpisodeModel.deleteMany({});
        await EpisodeModel.insertMany(mappedEpisodes);
        console.log('Episodes seed completed');
       
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
       
    } catch (error) {
        console.error('Episodes seed error', error);
    }
}

seed();