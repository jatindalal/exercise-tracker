import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as workoutRoutes } from './routes/workouts.js';

const app = express(); 
const port = process.env.PORT || 4000;

app.use(cors({
  origin: '*'
}));

app.use(json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, ()=> {
      console.log(`Listening on port ${port}`)
    });
  })
  .catch((error) => {
    console.log(error);
  })