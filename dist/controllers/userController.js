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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
//Mirar este import
const user_model_1 = require("../data/mongo/models/user.model");
//CREATE
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_model_1.UserModel.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid input data',
                details: error.message
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createUser = createUser;
//READ all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authReq = req;
        //Filter
        const filters = {};
        if (req.query.name)
            filters.name = req.query.name;
        if (req.query.email)
            filters.email = req.query.email;
        if (req.query.role)
            filters.role = req.query.role;
        if (req.query.createdAt)
            filters.createdAt = req.query.createdAt;
        if (req.query.updatedAt)
            filters.updatedAt = req.query.updatedAt;
        const filteredUsers = yield user_model_1.UserModel.find(filters);
        res.json(filteredUsers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving users' });
    }
});
exports.getUsers = getUsers;
//READ 1 User
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.UserModel.findOne({ id: Number(id) });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error retrieving user' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = yield user_model_1.UserModel.findOneAndUpdate({ id: Number(id) }, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Update failed' });
    }
});
exports.updateUser = updateUser;
//DELETE
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield user_model_1.UserModel.findOneAndDelete({ id: Number(id) });
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Delete failed' });
    }
});
exports.deleteUser = deleteUser;
