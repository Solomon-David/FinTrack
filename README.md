# FinTrack

FinTrack is a full-stack personal finance management application for tracking income, expenses, recurring bills, savings plans, and periodic financial summaries. It is built as an installable Progressive Web App (PWA) with a Vue 3 frontend and an Express/MongoDB backend.

## Features

- **Income & Expense tracking** — record transactions with support for multi-entry batch input, vendor/sender details, and currency handling
- **Bills** — manage recurring bill types (Electricity, Subscription, Insurance, etc.) with running paid/total balances, due dates, and automatic overdue detection
- **Plans** — create savings goals with progress tracking, target amounts (including "unknown" targets), due dates, and status (In Progress / Completed / Overdue)
- **RC-Data** — track airtime and mobile data purchases by network
- **Summaries** — generate on-demand financial summaries (Daily, Weekly, Monthly, Yearly) for custom date ranges, previewed without being persisted, or scheduled and saved automatically via a cron job
- **Authentication** — email/password signup with verification codes, JWT access/refresh token flow, forgot/reset password
- **Profile management** — editable profile fields, profile photo upload via Cloudinary, email change with re-verification
- **Progressive Web App** — installable on mobile and desktop, offline-capable via a service worker with network-first API caching and cache-first image caching

## Tech Stack

**Frontend**
- Vue 3 (Composition API, `<script setup>`)
- Vuetify 3 (Material Design components)
- TypeScript
- Pinia (state management)
- Vue Router
- Vite + `vite-plugin-pwa`
- Axios

**Backend**
- Express 5
- MongoDB with Mongoose
- TypeScript, run via `tsx`
- JSON Web Tokens (access + refresh token pattern)
- bcryptjs for password hashing
- Cloudinary + Multer for image uploads
- node-cron for scheduled summary generation
- Gmail API (OAuth2) for transactional email delivery

## Project Structure

```
FinTrack/
├── frontend/          # Vue 3 + Vuetify SPA
│   ├── src/
│   │   ├── api/           # Axios request functions per resource
│   │   ├── components/    # Feature-grouped Vue components (bills, plans, income, etc.)
│   │   ├── layouts/       # App shell layouts (guest / authenticated user)
│   │   ├── router/        # Vue Router configuration
│   │   ├── stores/        # Pinia stores per resource
│   │   ├── types/         # Shared TypeScript interfaces
│   │   └── views/         # Route-level page components
│   └── vite.config.ts
├── backend/            # Express + MongoDB API
│   ├── config/            # DB connection, Cloudinary, email, Multer config
│   ├── controllers/       # Route handler logic per resource
│   ├── interfaces/        # Shared TypeScript interfaces and Mongoose document types
│   ├── middlewares/       # Auth protection middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/              # Express route definitions
│   ├── utils/                # Token generation, summary computation, cron jobs
│   └── server.ts
└── package.json          # Root workspace scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local, or a free MongoDB Atlas cluster)
- A Cloudinary account (for profile photo uploads)
- A Google Cloud project with the Gmail API enabled (for sending verification/reset emails)

### Installation

Clone the repository and install dependencies for both the frontend and backend:

```bash
git clone https://github.com/Solomon-David/FinTrack.git
cd FinTrack

cd backend && npm install
cd ../frontend && npm install
```

### Environment Variables

Create a `.env` file in `backend/` with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

# CORS — comma-separated list of allowed frontend origins
FRONTEND_URL=http://localhost:5173

# JWT
ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gmail API (OAuth2) — used for verification and password reset emails
GMAIL_CLIENT_ID=your_oauth_client_id
GMAIL_CLIENT_SECRET=your_oauth_client_secret
GMAIL_REFRESH_TOKEN=your_oauth_refresh_token
GMAIL_SENDER_ADDRESS=your_sending_gmail_address
EMAIL_FROM_NAME=FinTrack
```

Create a `.env` file in `frontend/` with:

```env
VITE_APP_API_URL=http://localhost:3000/api
```

> **Never commit `.env` files.** Both `backend/.gitignore` and `frontend/.gitignore` should exclude `.env` and `.env.*`. Rotate any credentials immediately if a `.env` file is ever accidentally committed.

### Running Locally

From the project root, both servers can be started concurrently:

```bash
npm run dev
```

Or run each independently:

```bash
# Backend (http://localhost:3000)
cd backend && npm run dev

# Frontend (http://localhost:5173)
cd frontend && npm run dev
```

### Building for Production

```bash
cd frontend
npm run build   # type-checks with vue-tsc, then builds via Vite
npm run preview # preview the production build locally
```

## Deployment

FinTrack is designed to deploy with the **frontend on Vercel** and the **backend on Render**.

### Backend (Render)

- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- Set all backend environment variables listed above directly in Render's dashboard.
- `FRONTEND_URL` should point to your Vercel production domain. Vercel preview deployments are matched automatically via a hostname pattern in `server.ts`; adjust the pattern there if your Vercel team/project slug differs.

### Frontend (Vercel)

- **Root Directory:** `frontend`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Set `VITE_APP_API_URL` in Vercel's dashboard to your deployed Render backend URL (e.g. `https://your-backend.onrender.com/api`).
- `frontend/vercel.json` includes a rewrite rule so client-side routes resolve correctly on direct navigation and refresh.

## Key Architectural Notes

- **Email delivery** uses the Gmail REST API directly (via OAuth2), rather than SMTP. This is intentional: Render blocks outbound SMTP ports by default, so any SMTP-based transport (including nodemailer with OAuth2 credentials, which still opens an SMTP connection) will hang and fail in production. The Gmail API sends over standard HTTPS instead.
- **Summaries** can be generated as a **preview only** (computed on demand, not persisted) or generated and saved automatically by a scheduled cron job (`backend/utils/summaryCronJob.ts`), which also rolls recurring bills forward and marks overdue bills.
- **Bill payments** are recorded through the Expense flow — marking an expense as a bill payment against a `BillType` updates that bill type's running paid amount, rather than bills being tracked as standalone payment records.
- **PWA behavior** is configured via `vite-plugin-pwa` in `frontend/vite.config.ts`, with network-first caching for API calls and cache-first caching for Cloudinary-hosted images. Service worker updates check periodically while the app is open and apply automatically.

## License

ISC