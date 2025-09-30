import { Router } from 'express';
import { createLocation, deleteLocation, getLocation, getLocations, updateLocation } from '../controllers/locationController';
const locationRouter = Router();

locationRouter.post('/', createLocation);
locationRouter.get('/', getLocations);                         // Get all locations
locationRouter.get('/:id', getLocation);                       // Get 1 location
locationRouter.put('/:id', updateLocation);
locationRouter.delete('/:id', deleteLocation);


export default locationRouter;