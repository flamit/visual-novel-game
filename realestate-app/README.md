# Real Estate App (Next.js + Prisma + NextAuth)

Production-ready scaffold for a property listings application.

Features
- Public listings with filters
- Listing detail with gallery and lead form
- Admin dashboard (create listings) protected by auth
- Credentials auth via NextAuth
- Prisma + PostgreSQL schema (docker-compose provided)
- Tailwind CSS UI

Getting Started
1) Prerequisites
- Node 18+
- Docker (for local Postgres)

2) Install and run database
- cp .env.example .env
- docker compose up -d

3) Install deps and generate Prisma client
- npm install

4) Initialize DB and seed
- npx prisma migrate dev --name init
- npm run seed

5) Run the dev server
- npm run dev
Open http://localhost:3001

Auth
- Default admin: admin@example.com / admin123
- Change AUTH_SECRET in .env for production

Project Structure
- prisma/schema.prisma: Database models
- prisma/seed.ts: Seed data
- src/app: App Router routes
- src/app/api: API routes
- src/components: UI components
- src/lib: Prisma and auth setup

Production Notes
- Set DATABASE_URL and AUTH_SECRET in environment
- Use a real email service for lead notifications
- Replace local uploads with S3/Cloud storage if needed