# workholo

Workholo is a Bun and Nx monorepo created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack). It contains a React web app, an Elysia API, an Expo app, an Astro documentation site, and shared packages for the API, authentication, database, environment validation, and UI.

## Prerequisites

Install the following before starting:

- [Bun](https://bun.sh/) 1.4.0 (the version pinned in `package.json`)
- [Docker](https://docs.docker.com/get-docker/) with Docker Compose, for the local PostgreSQL database
- Git

Expo and Tauri have additional platform requirements. They are only needed when running the native mobile or desktop targets.

## Local setup

Run all commands from the repository root unless a section says otherwise.

### 1. Install dependencies

```bash
bun install
```

### 2. Create the local environment files

```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
```

The example files are configured for the local ports used by this repository:

| File | Variable | Local value |
| --- | --- | --- |
| `apps/server/.env` | `DATABASE_URL` | `postgresql://postgres:password@localhost:5432/workholo` |
| `apps/server/.env` | `BETTER_AUTH_URL` | `http://localhost:3000` |
| `apps/server/.env` | `CORS_ORIGIN` | `http://localhost:3001` |
| `apps/web/.env` | `VITE_SERVER_URL` | `http://localhost:3000` |

`BETTER_AUTH_SECRET` must be at least 32 characters. The example value is suitable only for local development. To generate your own value, run `openssl rand -base64 32` and paste the result into `apps/server/.env`.

### 3. Start PostgreSQL and apply the schema

```bash
bun run db:start
bun run db:push
```

`db:start` starts only the `postgres:18` service from `docker-compose.yml`. Its default local credentials match `apps/server/.env.example`.

### 4. Start the API and web app

Use two terminals:

```bash
# Terminal 1
bun run dev:server
```

```bash
# Terminal 2
bun run dev:web
```

The local services are then available at:

- Web app: [http://localhost:3001](http://localhost:3001)
- API health endpoint: [http://localhost:3000](http://localhost:3000)
- API reference: [http://localhost:3000/api-reference](http://localhost:3000/api-reference)

To stop PostgreSQL without deleting its data, run:

```bash
bun run db:stop
```

## Other development targets

### Run every development target

```bash
bun run dev
```

This starts every Nx project that defines a `dev` target: the web app, API server, Expo app, and Astro docs. For normal browser development, starting `dev:server` and `dev:web` separately is less noisy.

### Expo mobile app

Create `apps/native/.env` with an API URL reachable from the device or emulator:

```dotenv
EXPO_PUBLIC_SERVER_URL=http://YOUR_COMPUTER_LAN_IP:3000
```

Then start Expo:

```bash
bun run dev:native
```

Do not use `localhost` when testing on a physical phone; on the phone, `localhost` refers to the phone itself. Keep the API server running separately.

### Documentation site

```bash
bun run --cwd apps/docs dev
```

Astro serves the docs at [http://localhost:4321](http://localhost:4321) by default.

### Tauri desktop app

After installing the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for your operating system, run:

```bash
bun run --cwd apps/web desktop:dev
```

The Tauri configuration starts the Vite web app automatically.

## Database commands

| Command | Purpose |
| --- | --- |
| `bun run db:start` | Start PostgreSQL in the background |
| `bun run db:watch` | Start PostgreSQL and follow its output |
| `bun run db:stop` | Stop PostgreSQL while preserving its volume |
| `bun run db:push` | Push the current Drizzle schema to the database |
| `bun run db:generate` | Generate SQL migrations from schema changes |
| `bun run db:migrate` | Apply generated migrations |
| `bun run db:studio` | Open Drizzle Studio |

The Drizzle configuration always loads the database URL from `apps/server/.env`.

## Quality checks

This repository uses Ultracite with Biome and Nx for type checking and builds:

```bash
bun run check
bun run check-types
bun run build
```

To apply safe formatting and lint fixes, run:

```bash
bun run fix
```

## Docker Compose stack

To build and run the web app, API server, and PostgreSQL together, first create `apps/server/.env` as described above, then run:

```bash
bun run docker:up
bun run db:push
```

Useful commands:

```bash
bun run docker:logs
bun run docker:down
```

The Compose stack exposes the same URLs as local development: the web app on port 3001 and the API on port 3000. Database data is retained in the `workholo_postgres_data` Docker volume when the stack is stopped.

## Project structure

```text
workholo/
├── apps/
│   ├── docs/       # Astro Starlight documentation
│   ├── native/     # Expo and React Native application
│   ├── server/     # Elysia API server
│   └── web/        # React, Vite, and TanStack Router application
├── packages/
│   ├── api/        # Shared oRPC procedures and context
│   ├── auth/       # Better Auth configuration
│   ├── config/     # Shared TypeScript configuration
│   ├── db/         # Drizzle schema and database client
│   ├── env/        # Runtime environment validation
│   └── ui/         # Shared shadcn UI components and styles
└── docker-compose.yml
```

## UI development

Shared shadcn components live in `packages/ui/src/components`, and shared design tokens and global styles live in `packages/ui/src/styles/globals.css`.

Add a shared component from the repository root:

```bash
bun x shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components through the package exports:

```tsx
import { Button } from "@workholo/ui/components/button";
```
