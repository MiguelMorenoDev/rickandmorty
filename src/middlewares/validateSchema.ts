import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { IErrorResponse } from '../interfaces/error.interface';

// Middleware to validate requests using Zod

export const validateSchema = (schema: ZodObject ) => {
    return (req: Request, res: Response<IErrorResponse>, next: NextFunction ) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();
        } catch (error) {
            if ( error instanceof ZodError ) {
                const errorMessages = error.issues
                    .map((issue) => issue.message)
                    .join(', ');
                
                return res.status(400).json({
                    error: errorMessages
                });
            }

            return res.status(400).json({
                error: 'Validation error'
            });
        }
    };
};

