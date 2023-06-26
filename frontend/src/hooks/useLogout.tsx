import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem("user");

        // dispatch logout action
        if (dispatch) dispatch({ type: "LOGOUT", payload: null });
    };

    return { logout };
};
