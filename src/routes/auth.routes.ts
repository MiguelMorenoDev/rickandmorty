import { Router } from 'express';
import { login, verifyToken, register } from '../controllers/authController';
import { loginSchema, registerSchema } from '../validations/auth.validation';
import { validateSchema } from '../middlewares/validateSchema';

const authRouter = Router();

authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.post('/register', validateSchema(registerSchema), register);
authRouter.get('/verify', verifyToken);

export default authRouter;