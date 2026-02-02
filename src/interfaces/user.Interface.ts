export interface IUser {
    id: number;
    name: string;
    email: string;
    role?: 'user' | 'admin' | 'moderator';
    createdAt?: Date;
    updatedAt?: Date;
}