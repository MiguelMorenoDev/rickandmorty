import { Request, Response } from 'express'; 

//Mirar este import
import { IUserModel, UserModel } from '../data/mongo/models/user.model';
import { IErrorResponse } from '../interfaces/error.interface';
import { IUser } from '../interfaces/user.Interface';
import { IUserFilter} from '../interfaces/userFilter.interface';
import { IUserParams } from '../interfaces/userParams.interface';
import { AuthRequest } from '../interfaces/authRequest.interface';


//CREATE

export const createUser = async (
    req: Request<{},{},IUser,{}>,
    res: Response<IUser | IErrorResponse> ) => {
        try {
            const newUser = await UserModel.create(req.body);

            res.status(201).json( newUser );
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    error: 'Invalid input data',
                    details: error.message
                });
            }

            res.status(500).json({ error: 'Internal server error'});
        }
    }
//READ all users
export const getUsers = async (
    req: Request<{},{},{},IUserFilter>,
    res: Response<IUser[] | IErrorResponse> ) => {
  try {
    const authReq = req as AuthRequest;
        //Filter
        const filters: IUserFilter = {};

    if(req.query.name) filters.name = req.query.name;
    if(req.query.email) filters.email = req.query.email;
    if(req.query.role) filters.role = req.query.role;
    if(req.query.createdAt) filters.createdAt = req.query.createdAt;
    if(req.query.updatedAt) filters.updatedAt = req.query.updatedAt;

    const filteredUsers = await UserModel.find(filters);
    res.json(filteredUsers);
  } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error retrieving users'});
  }
};

//READ 1 User
export const getUser = async (
    req: Request<IUserParams,{},{},{}>,
    res: Response<IUser | IErrorResponse> ) => {

        const { id } = req.params;

        try {
            const user = await UserModel.findOne( { id: Number(id) } );

            if (!user) {
                return res.status(404).json( { error: 'User not found'});
            }

            res.json(user);

        } catch (error) {
            return res.status(500).json( { error: 'Error retrieving user'});
        }
    };

    //UPDATE

    type IUserUpdate = Partial<IUser>;
    export const updateUser = async (
        req: Request<IUserParams,{},IUserUpdate,{}>,
        res: Response<IUser | IErrorResponse> ) => {
            const { id } = req.params;
            const updateData = req.body;

            try {
                const updatedUser = await UserModel.findOneAndUpdate(
                    { id: Number(id)},
                    updateData,
                    { new: true }
                );

            if (!updatedUser) {
                return res.status(404).json( { error: 'User not found'});
            }

            res.json( updatedUser );

            } catch (error) {
                console.log(error);
                res.status(500).json( { error: 'Update failed'});
            }
        };

    //DELETE
    export const deleteUser = async (
        req: Request<IUserParams,{},{},{}>,
        res: Response<{ message: string } | IErrorResponse>) => {
            const { id } = req.params;

            try {
                const result = await UserModel.findOneAndDelete({ id: Number( id )});

                if ( !result ) {
                    return res.status(404).json( { error: 'User not found'});
                }

                res.json({ message: 'User deleted successfully' });

            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Delete failed'});
            }
        }
    
