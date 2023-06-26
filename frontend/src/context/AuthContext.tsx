import { FunctionComponent, createContext, useEffect, useReducer } from "react";
import { User } from "../assets/User";

type AuthContextType = {
    dispatch?: React.Dispatch<Action>;
    user: User | null;
};

type Action = {
    type: string;
    payload: User | null;
};

interface Props {
    children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthReducer = (state: AuthContextType, action: Action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider: FunctionComponent<Props> = ({
    children,
}: Props) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
    });

    useEffect(() => {
        const userString = localStorage.getItem("user");

        if (userString) {
            const user = JSON.parse(userString);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    console.log("Authcontext state: ", state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
