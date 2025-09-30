"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationController_1 = require("../controllers/locationController");
const locationRouter = (0, express_1.Router)();
locationRouter.post('/', locationController_1.createLocation);
locationRouter.get('/', locationController_1.getLocations); // Get all locations
locationRouter.get('/:id', locationController_1.getLocation); // Get 1 location
locationRouter.put('/:id', locationController_1.updateLocation);
locationRouter.delete('/:id', locationController_1.deleteLocation);
exports.default = locationRouter;
