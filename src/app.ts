import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/routes';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);


export default app;
