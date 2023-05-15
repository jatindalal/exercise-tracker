import { FunctionComponent, createContext, useReducer } from "react";
import Workout from "../assets/Workout";

type WorkoutsContextType = {
  dispatch?: React.Dispatch<Action>;
  workouts: Workout[];
};

type Action = {
  type: string;
  payload: Workout[];
};

interface Props {
  children?: React.ReactNode;
}

export const WorkoutsContext = createContext<WorkoutsContextType | null>(null);

export const workoutsReducer = (state: WorkoutsContextType, action: Action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload[0], ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w: Workout) => w._id !== action.payload[0]._id),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider: FunctionComponent<Props> = ({
  children,
}: Props) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: []
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
