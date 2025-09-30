import mongoose from 'mongoose';
import { envs } from '../../config/envs';



interface Options {
    mongoUrl: string,
    dbName: string
}

export class MongoDatabase {
    static async connect ( options: Options ) {
        const { mongoUrl, dbName } = options;
     
            await mongoose.connect( mongoUrl , {
                dbName : dbName
            });
            
        }  
        
    
}