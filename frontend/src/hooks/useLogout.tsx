import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();
    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem("user");

        // dispatch logout action
        if (authDispatch) authDispatch({ type: "LOGOUT", payload: null });

        // clear workouts context
        if (workoutsDispatch) workoutsDispatch({type: "SET_WORKOUT", payload: []})
    };

    return { logout };
};
