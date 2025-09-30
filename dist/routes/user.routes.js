"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', auth_middleware_1.authMiddleware, userController_1.getUsers);
exports.default = usersRouter;
