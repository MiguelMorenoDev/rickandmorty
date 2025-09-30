import { Request, Response } from 'express';
import { EpisodeModel } from '../data/mongo/models/episode.model';
import { IEpisode } from '../interfaces/episode.interface';
import { IEpisodeFilter } from '../interfaces/episodeFilter.interface';
import { IErrorResponse } from '../interfaces/error.interface';
import { IEpisodeParams } from '../interfaces/episodeParams.interface';
//CREATE

export const createEpisode = async (
    req: Request<{},{},IEpisode,{}>, 
    res: Response <IEpisode | IErrorResponse>) => {
try {
        const newEpisode = await EpisodeModel.create(req.body);
        res.status(201).json(newEpisode);
} catch (error: any) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Invalid input data',
            details: error.message
        })
    }

    res.status(500).json({ error: 'Internal server error'});
}

}

//READ all episodes

export const getEpisodes = async (
    req: Request<{},{},{},IEpisodeFilter>, 
    res: Response<IEpisode[] | IErrorResponse>) => {
    try {
        
        //Filter
        const filters: IEpisodeFilter = {};

    if (req.query.name) filters.name = req.query.name;
    if (req.query.episodeCode) filters.episodeCode = req.query.episodeCode;
   
    const filteredEpisodes = await EpisodeModel.find(filters);
    res.json(filteredEpisodes);
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving location' });
    }
};

//Read 1 Episode
export const getEpisode = async (
    req: Request<IEpisodeParams,{},{},{}>,
    res: Response<IEpisode | IErrorResponse>) => {
    const { id } = req.params;

 const episode = await EpisodeModel.findOne( { id: Number(id) } );
    try {
       
        if (!episode) {
            return res.status(400).json({ error: 'Episode not found'});
        }
        res.json(episode);

    } catch (error) {
        return res.status(400).json({ error: 'Error retrieving episode'});
    }    
}

//UPDATE

type IEpisodeUpdate = Partial<IEpisode>
export const updateEpisode = async (
    req: Request<IEpisodeParams,{},IEpisodeUpdate,{}>, 
    res: Response<IEpisode | IErrorResponse> ) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedEpisode = await EpisodeModel.findOneAndUpdate(
            { id: Number(id)},
            updateData,
            { new: true }
        );

        if (!updatedEpisode) {
            return res.status(404).json({ error: 'Episode not found'});
        }

        res.json ( updatedEpisode );

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });
    }
}

//DELETE
export const deleteEpisode = async (
    req: Request<IEpisodeParams,{},{},{}>, 
    res: Response <{ message: string } | IErrorResponse> ) => {

    const { id } = req.params;

    try {
        const result = await EpisodeModel.findOneAndDelete({id: Number(id) });

            if (!result) {
                return res.status(404).json( { message: 'Episode not found'} );
            }

            res.json({ message: 'Episode deleted successfully' });

        } catch ( error ) {
            console.log(error);
            res.status(500).json({ message: 'Delete failed' });
        }
       
    }
