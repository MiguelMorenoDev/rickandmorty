import 'dotenv/config';
import { MongoDatabase } from './data/mongo/mongo-database';
import { envs } from './config/envs';
import characterRouter from './routes/character.routes';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import locationRouter from './routes/location.routes';
import episodeRouter from './routes/episode.routes';
import usersRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import characterSwagger from './docs/character.swagger.json';
import episodeSwagger from './docs/episode.swagger.json';
import locationSwagger from './docs/location.swagger.json';
import userSwagger from './docs/user.swagger.json';
import authSwagger from './docs/auth.swagger.json';

const app = express();

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
      url: `http://localhost:${envs.PORT}`,
      description: 'Development server'
    },
    {
      url: 'https://rickandmorty-w440.onrender.com',
      description: 'Production server'
    }
  ],
  components: {
    schemas: {
      // Merge all schemas without overwriting
      ...characterSwagger.components?.schemas,
      ...episodeSwagger.components?.schemas,
      ...locationSwagger.components?.schemas,
      ...userSwagger.components?.schemas,
      ...authSwagger.components?.schemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    // Include all endpoint paths
    ...characterSwagger.paths,
    ...episodeSwagger.paths,
    ...locationSwagger.paths,
    ...userSwagger.paths,
    ...authSwagger.paths,
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Initialize application
(async () => {
  await main();
})();

async function main() {
  try {
    // Connect to MongoDB
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
    console.log(`MongoDB connected at ${envs.MONGO_URL}`);
  } catch (error) {
    console.log('MongoDB connection error');
    console.log(error);
  }

  // Middleware
  app.use(express.json());

  // API routes
  app.use('/api/characters', characterRouter);
  app.use('/api/locations', locationRouter);
  app.use('/api/episodes', episodeRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);
  app.use('/images', express.static('src/public/images'));

  // Swagger documentation UI
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Rick and Morty API Docs'
  }));

  // Endpoint to get Swagger JSON specification
  app.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  // Start server
  app.listen(envs.PORT, () => {
    console.log(`Server running at port ${envs.PORT}`);
    
    console.log(`Swagger docs available at http://localhost:${envs.PORT}/api/api-docs`);
  });

}