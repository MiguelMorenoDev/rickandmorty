import { Request } from 'express';
import { JWTPayload } from './jwt.interface';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}