import { FunctionComponent } from "react";

import Workout from "../assets/Workout";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface post {
  key: string;
  workout: Workout;
}

const WorkoutDetails: FunctionComponent<post> = ({ workout }) => {
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) console.log(json);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;