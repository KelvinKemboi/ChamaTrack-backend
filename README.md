# My Chama Money Management App — Backend (Node.js + Express)

A backend API for SACCO money management that supports transactions, summaries, and chart data. Built with **Node.js + Express** and backed by **Neon PostgreSQL**.

## Features

- **REST API** for transaction operations
- **Transactions**: create, fetch by user, and delete
- **Summary endpoint**: income, expenses, and balance per user
- **Graph endpoint**: monthly income vs expenses
- **Rate limiting** with Upstash Redis
- **Cron job support** for scheduled backend tasks
- **Environment-based config** using `.env`

## Tech Stack

- **Node.js**
- **Express**
- **Neon PostgreSQL** (`@neondatabase/serverless`)
- **Upstash Redis + Ratelimit**
- **dotenv**
- **cron**
- **nodemon** (dev)

## Getting Started

### Clone the repo
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### Go to backend folder
```bash
cd Sacco-api
```

### Install dependencies
```bash
npm install @neondatabase/serverless @upstash/ratelimit @upstash/redis cors cron dotenv express
```

### Install dev dependencies
```bash
npm install -D nodemon
```

### Create `.env`
```env
PORT=5000
DATABASE_URL=your_neon_postgres_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=development
```

### Start the server (dev)
```bash
npm run dev
```

### Start the server (production)
```bash
npm start
```

## API Base URL

```text
/api/transactions
```

## Main Endpoints

- `GET /:userId`
- `GET /summary/:userId`
- `GET /graph/:userId`
- `POST /`
- `DELETE /:id`
