import express from "express";

import {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

// get all workouts
router.get('/', getWorkouts);

// get single workout
router.get('/:id', getWorkout);

// post a new workout
router.post('/', createWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id', updateWorkout);

export { router };