import {Schema, model } from 'mongoose';

export interface IUserModel extends Document {
    id: number,
    name: string,
    email: string,
    password: string,
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true},
    role: {type: String, default: "user" }
},
{ timestamps: true }

);

export const UserModel = model<IUserModel>("User", userSchema);