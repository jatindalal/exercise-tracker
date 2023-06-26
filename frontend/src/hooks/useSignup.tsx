import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean | undefined>();
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if (!json.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (json.email && json.token && dispatch) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // update the auth context
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        }
    };
    return { signup, isLoading, error };
};