import { createContext, useContext, useState } from "react";
import {
    loginHandler,
    signupHandler,
    signoutHandler,
} from "../services/auth-service";

const defaultAuthValue = {
    isAuthorized: false,
    token: false,
};

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(defaultAuthValue);
    const encodedToken = localStorage.getItem("token");

    const setAuthTokens = (encodedToken) => {
        setAuth({ ...auth, isAuthorized: true, token: encodedToken });
    };

    const removeAuthTokens = () => {
        setAuth({ ...auth, isAuthorized: false, token: false });
    };

    if (!auth.isAuthorized) {
        encodedToken && setAuthTokens(encodedToken);
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuthTokens,
                removeAuthTokens,
                loginHandler,
                signupHandler,
                signoutHandler,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
