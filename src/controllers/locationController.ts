import {Request, Response } from 'express';
import { LocationModel } from '../data/mongo/models/location.model';
import { ILocation } from '../interfaces/location.interface';
import { IErrorResponse } from '../interfaces/error.interface';
import { ILocationFilter } from '../interfaces/locationFilter.interface';
import { ILocationParams } from '../interfaces/locationParams.interface';
//CREATE
export const createLocation = async (
    req: Request<{},{},ILocation,{}>, 
    res: Response<ILocation | IErrorResponse>) => {
    try {
        const newLocation = await LocationModel.create(req.body);

        res.status(201).json( newLocation );

    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid input data',
                details: error.message
            });
        }

        res.status(500).json({ error: 'Internal server error'});
    }
}

// READ all location
export const getLocations = async (
    req: Request<{},{},{},ILocationFilter>, 
    res: Response<ILocation[] | IErrorResponse> ) => {
  try {

     //Filter
    const filters: ILocationFilter = {};

    if (req.query.name) filters.name = req.query.name;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.dimension) filters.dimension = req.query.dimension;
  

    const filteredLocations = await LocationModel.find(filters);
    res.json(filteredLocations);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving location' });
  }
};

//READ 1 location
export const getLocation = async (
    req: Request<ILocationParams,{},{},{}>, 
    res: Response<ILocation | IErrorResponse>) => {

    const { id } = req.params;

    try {
        const location = await LocationModel.findOne( { id: Number(id) } );
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found'});
        }

        res.json(location);

    } catch (error) {
            return res.status(500).json({ error: 'Error retrieving location'});
    }

};

//UPDATE

type ILocationUpdate = Partial<ILocation>;
export const updateLocation = async (
    req: Request<ILocationParams,{},ILocationUpdate,{}>, 
    res: Response<ILocation | IErrorResponse> ) => {

     const { id } = req.params;
      const updateData = req.body;

        try {
            const updatedLocation = await LocationModel.findOneAndUpdate(
                { id: Number(id)},
                updateData,
                { new: true }
            );

        if ( !updatedLocation) {
            return res.status(404).json({ error: 'Location not found'});
        }

        res.json( updatedLocation );

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });

        }
    };

//DELETE
export const deleteLocation = async (
    req: Request<ILocationParams,{},{},{}>, 
    res: Response<{ message: string } | IErrorResponse>) => {

    const { id } = req.params;

     try {
         const result =  await LocationModel.findOneAndDelete({id: Number(id) });

         if ( !result ) {
            return res.status(404).json( { error: 'Location not found'} );
         }

            res.json({ message: 'Location deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Delete failed' });

        }
};
