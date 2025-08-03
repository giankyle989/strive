import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import goalRoutes from './routes/goal.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/goals', goalRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));
export default app;
