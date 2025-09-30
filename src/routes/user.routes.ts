import { Router, RequestHandler } from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { IUserParams } from '../interfaces/userParams.interface';

const usersRouter = Router();

//Public routes
usersRouter.post('/', createUser);



//Protected routes

usersRouter.get('/', authMiddleware, getUsers);
usersRouter.get('/:id', authMiddleware, getUser as RequestHandler<{ id: string }>);
usersRouter.put('/:id', authMiddleware, updateUser as RequestHandler<{ id: string }>);
usersRouter.delete('/:id', authMiddleware, deleteUser as RequestHandler<{ id: string }>);



export default usersRouter;