# Rick and Morty API Clone 🚀

A Node.js API replicating the [Rick and Morty API](https://rickandmortyapi.com) with JWT authentication, built with TypeScript, Express and MongoDB.

## Features ✨

- **Full CRUD** operations for Characters, Episodes, Locations and Users
- **JWT Authentication** with protected routes
- **MongoDB** with seeded Rick and Morty data
- **Swagger Documentation** at `/api/docs`
- **Render Ready** for deployment

## Quick Start 🚀

1. **Clone and install:**
```bash
git clone https://github.com/MiguelMorenoDev/rickandmorty.git
cd rickandmorty
npm install
```

2. **Create `.env` file:**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/rickandmorty
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=2h
```

3. **Seed the database (optional):**
```bash
npm run seedall
```

4. **Start the server:**
```bash
npm run dev
```

## API Documentation 📖

**🔗 [Live Swagger Docs](http://localhost:3000/api/api-docs)**

### Endpoints:
- 👥 **Auth**: `/api/auth` - Register/Login
- 👨‍🚀 **Characters**: `/api/characters`
- 📺 **Episodes**: `/api/episodes`
- 🌍 **Locations**: `/api/locations`
- 👤 **Users**: `/api/users` (protected)

## Live Demo 🌐

**[Live Demo](https://rickandmorty-w440.onrender.com)**: Initial response may take up to 60 seconds as the server wakes up from sleep

## Tech Stack 🛠️

- **Node.js** + **TypeScript**
- **Express** + **MongoDB** 
- **JWT** + **Bcrypt**
- **Swagger** for docs

## Available Scripts 📜

```bash
npm run dev          # Start development server
npm run seedall      # Seed all data (characters, episodes, locations)
npm run characterdataseed  # Seed only characters
npm run episodedataseed    # Seed only episodes  
npm run locationdataseed   # Seed only locations
```