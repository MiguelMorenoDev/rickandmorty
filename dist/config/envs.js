"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    MONGO_URL: (0, env_var_1.get)('MONGO_URL').required().asString(),
    MONGO_DB_NAME: (0, env_var_1.get)('MONGO_DB_NAME').required().asString(),
    JWT_SECRET: (0, env_var_1.get)('JWT_SECRET').required().asString(),
    JWT_EXPIRES_IN: (0, env_var_1.get)('JWT_EXPIRES_IN').required().asString()
};
