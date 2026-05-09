# Food Delivery App Monorepo

This repository now contains:

- **`frontend/`**: an Expo React Native app configured to run on **iOS, Android, and Web**.
- **`backend/`**: a NestJS API connected to **PostgreSQL** using TypeORM.

## Project Structure

- `frontend/` — Expo app (React Native + Expo Router)
- `backend/` — NestJS API (`/health` + `/restaurants` sample module)

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Backend setup (NestJS + PostgreSQL)

1. Copy env vars:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Update `DATABASE_URL` in `.env`.

3. Install and run:

   ```bash
   npm install
   npm run start:dev
   ```

Server starts at `http://localhost:3000`.

## Frontend setup (Expo for web + mobile)

```bash
cd frontend
npm install
npm run start
```

Then press:

- `w` for web
- `i` for iOS simulator
- `a` for Android emulator

## API usage from frontend

Set API base URL in `frontend/src/config.ts`:

- Web default: `http://localhost:3000`
- Physical device: replace with your machine LAN IP, e.g. `http://192.168.1.10:3000`

## Helpful scripts

### Backend

- `npm run start:dev` — dev server
- `npm run build` — build backend
- `npm run start` — run built server

### Frontend

- `npm run start` — Expo dev tools
- `npm run web` — run web target
- `npm run android` — run Android
- `npm run ios` — run iOS
