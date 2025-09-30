"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_json_1 = __importDefault(require("../seeds/users.json"));
const user_model_1 = require("../data/mongo/models/user.model");
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined as a enviroment variable');
}
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        yield user_model_1.UserModel.deleteMany({});
        const hashedUsers = users_json_1.default.map(user => (Object.assign(Object.assign({}, user), { password: bcryptjs_1.default.hashSync(user.password, 10) })));
        yield user_model_1.UserModel.insertMany(hashedUsers);
        console.log("Users seed completed");
        yield mongoose_1.default.disconnect();
        console.log("MongoDB disconected");
    }
    catch (error) {
        console.error('Users seed Error', error);
    }
});
seedUsers();
