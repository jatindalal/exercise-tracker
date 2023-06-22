import { FunctionComponent } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import Workout from "../assets/Workout";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface post {
  key: string;
  workout: Workout;
}

const WorkoutDetails: FunctionComponent<post> = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(
      "/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok && dispatch)
      dispatch({ type: "DELETE_WORKOUT", payload: [json] });
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
