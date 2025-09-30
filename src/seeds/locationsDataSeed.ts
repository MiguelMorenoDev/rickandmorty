import "dotenv/config";
import mongoose from "mongoose";
import locationsData from "./locations.json";
import { LocationModel } from "../data/mongo/models/location.model";

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
        const mappedLocations = locationsData.locations.map(location => ({
            id: location.id,
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            residents: location.residents.map(resident => resident.replace('${process.env.API_DOMAIN}', API_DOMAIN)),
            url: location.url.replace('${process.env.API_DOMAIN}', API_DOMAIN),
            created: location.created
        }));
        
        await LocationModel.deleteMany({});
        await LocationModel.insertMany(mappedLocations);
        console.log('Locations seed completed');
       
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
       
    } catch (error) {
        console.error('Locations seed error', error);
    }
}

seed();