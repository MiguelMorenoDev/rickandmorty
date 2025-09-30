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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongo_database_1 = require("./data/mongo/mongo-database");
const envs_1 = require("./config/envs");
const character_routes_1 = __importDefault(require("./routes/character.routes"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const episode_routes_1 = __importDefault(require("./routes/episode.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const character_swagger_json_1 = __importDefault(require("./docs/character.swagger.json"));
const episode_swagger_json_1 = __importDefault(require("./docs/episode.swagger.json"));
const location_swagger_json_1 = __importDefault(require("./docs/location.swagger.json"));
const user_swagger_json_1 = __importDefault(require("./docs/user.swagger.json"));
const auth_swagger_json_1 = __importDefault(require("./docs/auth.swagger.json"));
const app = (0, express_1.default)();
// Swagger configuration - combining base config with all documentation
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Rick and Morty API Clone',
        version: '1.0.0',
        description: 'A Rick and Morty API clone with authentication',
        contact: {
            name: 'API Support',
            email: 'support@rickandmortyapi.com'
        },
    },
    servers: [
        {
            url: `http://localhost:${envs_1.envs.PORT}`,
            description: 'Development server'
        },
        {
            url: 'https://your-domain.com',
            description: 'Production server'
        }
    ],
    components: {
        schemas: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (_a = character_swagger_json_1.default.components) === null || _a === void 0 ? void 0 : _a.schemas), (_b = episode_swagger_json_1.default.components) === null || _b === void 0 ? void 0 : _b.schemas), (_c = location_swagger_json_1.default.components) === null || _c === void 0 ? void 0 : _c.schemas), (_d = user_swagger_json_1.default.components) === null || _d === void 0 ? void 0 : _d.schemas), (_e = auth_swagger_json_1.default.components) === null || _e === void 0 ? void 0 : _e.schemas),
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, character_swagger_json_1.default.paths), episode_swagger_json_1.default.paths), location_swagger_json_1.default.paths), user_swagger_json_1.default.paths), auth_swagger_json_1.default.paths),
    security: [
        {
            bearerAuth: [],
        },
    ],
};
// Initialize application
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongo_database_1.MongoDatabase.connect({
                dbName: envs_1.envs.MONGO_DB_NAME,
                mongoUrl: envs_1.envs.MONGO_URL,
            });
            console.log(`MongoDB connected at ${envs_1.envs.MONGO_URL}`);
        }
        catch (error) {
            console.log('MongoDB connection error');
            console.log(error);
        }
        // Middleware
        app.use(express_1.default.json());
        // API routes
        app.use('/api/characters', character_routes_1.default);
        app.use('/api/locations', location_routes_1.default);
        app.use('/api/episode', episode_routes_1.default);
        app.use('/api/users', user_routes_1.default);
        app.use('/api/auth', auth_routes_1.default);
        app.use('/images', express_1.default.static('src/public/images'));
        // Swagger documentation UI
        app.use('/api/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, {
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: 'Rick and Morty API Docs'
        }));
        // Endpoint to get Swagger JSON specification
        app.get('/api/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerDocument);
        });
        // Start server
        app.listen(envs_1.envs.PORT, () => {
            console.log(`Server running at port ${envs_1.envs.PORT}`);
            console.log(`Swagger docs available at http://localhost:${envs_1.envs.PORT}/api/api-docs`);
        });
    });
}
