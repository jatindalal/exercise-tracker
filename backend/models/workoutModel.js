import mongoose from "mongoose";

const schema = mongoose.Schema;

export const workoutSchema = new schema(
  {
    title: {
      type: String,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    load: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema);