import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import userData from "../seeds/users.json";
import { UserModel } from '../data/mongo/models/user.model';

//Interface for typing JSON in the seed

interface UserSeed {
    id: number,
    name:string,
    email: string,
    password: string,
    role?: string;
}

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined as a enviroment variable');
}

const seedUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        await UserModel.deleteMany({});

        const hashedUsers = (userData as UserSeed[]).map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, 10),
            
        }));

        await UserModel.insertMany(hashedUsers);
        console.log("Users seed completed");

        await mongoose.disconnect();
        console.log("MongoDB disconected");
    } catch (error) {
            console.error('Users seed Error', error);

    }
};

seedUsers();