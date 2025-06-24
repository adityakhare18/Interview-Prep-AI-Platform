import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoute.js';
import sessionRoutes from './routes/sessionRoute.js';
import questionRoutes from './routes/questionRoute.js';
import { protect } from './middlewares/authMiddleware.js';

import {
  generateInterviewQuestions,
  generateConceptExplanation,
} from './controllers/aiController.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true, 
  })
);


app.use(cookieParser());

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
