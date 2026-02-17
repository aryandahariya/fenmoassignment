# Expense Tracker (Full-Stack)

Production-ready full-stack Expense Tracker using React + Vite + Tailwind (frontend) and Node.js + Express + MongoDB (backend).

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, Mongoose, dotenv
- Architecture: MVC (Model, Controller, Routes)
- API Style: RESTful
- State Management: React hooks
- Process tooling: nodemon, concurrently

## Folder Structure

```text
root/
  client/
    src/
      components/
        ExpenseForm.jsx
        ExpenseItem.jsx
        ExpenseList.jsx
        FilterSort.jsx
        Spinner.jsx
        TotalDisplay.jsx
      pages/
        Dashboard.jsx
      services/
        expenseService.js
      App.jsx
      index.css
      main.jsx
    .env.example
    index.html
    package.json
    postcss.config.cjs
    tailwind.config.cjs
    vite.config.js
  server/
    config/
      db.js
    controllers/
      expenseController.js
    middleware/
      errorMiddleware.js
    models/
      Expense.js
    routes/
      expenseRoutes.js
    .env.example
    nodemon.json
    package.json
    server.js
  .gitignore
  package.json
  README.md
```

## API Endpoints

### `POST /api/expenses`
Create a new expense.

Request body:

```json
{
  "amount": 125.5,
  "category": "Food",
  "description": "Team lunch",
  "date": "2026-02-17"
}
```

Validation:
- `amount` must be positive
- `date` is required

### `GET /api/expenses?category=&sort=date_desc`
Get expenses with optional category filter and date sorting.

Query params:
- `category` (optional)
- `sort`: `date_desc` (default) or `date_asc`

## Setup

### 1. Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 2. Configure environment

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Optional: create `client/.env` from `client/.env.example`.

```env
VITE_API_URL=https://expensetracker-ngbx.onrender.com
```

If you use MongoDB Atlas, set your Atlas connection string in `server/.env` as `MONGO_URI`.

### 3. Run frontend + backend together

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 4. Build frontend for production

```bash
npm run build
```

## Features Implemented

- Add expense form (amount, category, description, date)
- Fetch all expenses
- Filter by category
- Sort by newest first (default)
- Total of filtered expenses
- Loading spinner + error states
- Duplicate submit prevention
- Optimistic UI update on create
- Clean responsive UI with cards + table layout
- Backend error middleware + request validation

## Notes

- MongoDB must be running before starting the backend.
- Vite dev server proxies `/api` to Express.
- `VITE_API_URL` can be backend root URL or backend `/api` URL.

## Render Deployment

### Backend (Web Service)

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `MONGO_URI=<your mongodb atlas uri>`
  - `NODE_ENV=production`
  - `CORS_ORIGIN=<your frontend render url>` (optional, comma-separated for multiple origins)

Test after deploy:
- `GET https://expensetracker-ngbx.onrender.com/api/health`

### Frontend (Static Site)

- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables:
  - `VITE_API_URL=https://expensetracker-ngbx.onrender.com`

## Troubleshooting

- Error: `MONGO_URI ... got "undefined"`:
  `server/.env` is missing or `MONGO_URI` is empty.
- Error: `connect ECONNREFUSED 127.0.0.1:27017`:
  local MongoDB is not running. Start MongoDB or use Atlas in `server/.env`.
- UI shows `Request failed with status code 500`:
  backend is running but API failed. Check server terminal logs first.
