import { envs } from "../config/envs"
import {Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../data/mongo/models/user.model';
import { LoginBody, LoginResponse } from "../interfaces/login.interface";
import { IErrorResponse } from "../interfaces/error.interface";

const { JWT_SECRET, JWT_EXPIRES_IN } = envs;

export const login = async (
    req: Request<{},{},LoginBody,{}>,
    res: Response<LoginResponse | IErrorResponse>
) => {
    try {
        const { email, password } = req.body;
        
        // Search user by email
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ error: "User not found"});
        
        //Check password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password"});
        
        //Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );
        
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error"});
    }
}

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        //Check if user already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists"});
        }

        //Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        //Create user
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        //Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );

        return res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error'});
    }
}

export const verifyToken = async (
    req: Request,
    res: Response
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(403).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        // Optionally get fresh user data
        const user = await UserModel.findOne({ id: decoded.id }).select('-password');
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        return res.json({
            success: true,
            message: 'Token is valid',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
        
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token' 
        });
    }
}