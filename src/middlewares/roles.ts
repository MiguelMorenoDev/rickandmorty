import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '../interfaces/error.interface';

type JwtUser = {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
};

export const authorize = (allowedRoles: string[]) => 
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtUser | undefined;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };

