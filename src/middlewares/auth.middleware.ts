import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';
import { IErrorResponse } from '../interfaces/error.interface';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { JWTPayload } from '../interfaces/jwt.interface';

const { JWT_SECRET } = envs;

export const authMiddleware = (
    req: Request,
    res: Response<IErrorResponse>,
    next: NextFunction
) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        (req as AuthRequest).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};