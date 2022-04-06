import axios from "axios";

const loginHandler = async (loginCredentials, setAuthTokens, navigation) => {
    try {
        const { data } = await axios.post("/api/auth/login", {
            email: loginCredentials.email,
            password: loginCredentials.password,
        });
        const encodedToken = data.encodedToken;
        localStorage.setItem("token", encodedToken);
        setAuthTokens(encodedToken);
        navigation("/");
    } catch (error) {
        console.log(error);
    }
};

const signupHandler = async (signupCredentials, setAuthTokens, navigation) => {
    try {
        const { data } = await axios.post("/api/auth/signup", {
            firstName: signupCredentials.firstName,
            lastName: signupCredentials.lastName,
            email: signupCredentials.email,
            password: signupCredentials.password,
        });
        const encodedToken = data.encodedToken;
        localStorage.setItem("token", encodedToken);
        setAuthTokens(encodedToken);
        navigation("/");
    } catch (error) {
        console.log(error);
    }
};

const signoutHandler = async (removeAuthTokens, navigation) => {
    try {
        localStorage.removeItem("token");
        removeAuthTokens();
        navigation("/");
    } catch (error) {
        console.log(error);
    }
};

export { loginHandler, signupHandler, signoutHandler };
