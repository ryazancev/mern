import {createContext} from "react";

const noop = () => {};
// Типа initial state
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuth: false
});