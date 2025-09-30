import { Router } from "express";
import { createEpisode, deleteEpisode, getEpisode, getEpisodes, updateEpisode } from "../controllers/episodeController";

const episodeRouter = Router();

episodeRouter.post('/', createEpisode);
episodeRouter.get('/', getEpisodes);
episodeRouter.get('/:id', getEpisode);
episodeRouter.put('/:id', updateEpisode);
episodeRouter.delete('/:id', deleteEpisode);

export default episodeRouter;