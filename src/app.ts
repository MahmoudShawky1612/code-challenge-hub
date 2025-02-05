import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import challengeRoutes from './routes/challenge.route';
import commentRoutes from './routes/comment.route';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);
app.use("/api/v1", challengeRoutes,commentRoutes);


export default app;
