# Strive: Goal Tracking App

Strive is a simple goal-setting and milestone-tracking application where users can define personal goals, upload milestone images, and monitor their progress. Built using the MERN stack with AWS S3 support for image uploads.

---

## 🛠 Tech Stack

### Client (Frontend)

- React + Vite + TypeScript
- Tailwind CSS
- shadcn/ui
- React Router DOM
- TanStack Query

### Server (Backend)

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- AWS SDK (S3)
- REST API

---

## 📁 Folder Structure

```
strive/
├── strive-client/   # Frontend
└── strive-server/   # Backend
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd strive
```

---

### 2. Setup Backend (strive-server)

```bash
cd strive-server
npm install
```

#### Create a `.env` file inside `strive-server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

#### Start the backend server:

```bash
npm run dev
```

Runs at: [http://localhost:5000](http://localhost:5000)

---

### 3. Setup Frontend (strive-client)

```bash
cd ../strive-client
npm install
```

#### Optional: Create a `.env` file inside `strive-client/`:

```env
VITE_API_URL=http://localhost:5000
```

#### Start the frontend dev server:

```bash
npm run dev
```

Runs at: [http://localhost:8080](http://localhost:8080)

---

## ✅ Features

- Create and manage goals
- Upload milestone images to AWS S3
- Track goal progress visually
- Modern, responsive UI

---

## 📦 Deployment Tips

- Frontend can be deployed to Vercel, Netlify, or AWS S3 + CloudFront
- Backend can be deployed to Render, Railway, or AWS EC2
- Ensure environment variables are properly configured on each platform

---
