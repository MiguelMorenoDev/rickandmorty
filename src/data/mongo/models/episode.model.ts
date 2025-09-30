import { Schema, model } from 'mongoose';
import { IEpisode } from '../../../interfaces/episode.interface';

const episodeSchema = new Schema<IEpisode>({
id: { type: Number, required: true, unique: true },
name: { type: String, required: true },
air_date: { type: String, required: true },
episodeCode: {type: String, required: true},
characters: [{
    type: String,
}],
url:{ type: String, default: "" },
created: { type: Date, default: Date.now }

}); 

export const EpisodeModel =model<IEpisode>('Episode', episodeSchema);